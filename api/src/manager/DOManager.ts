import LogManager from "../manager/LogManager";
import { calculateANameValueForSubdomain } from "../ANameHelper";
const zone = require("zone-file");
import SubdomainDb, { SubdomainEntry } from "../db/SubdomainDb";
import SettingsDb from "../db/SettingsDb";
import IPManager from "./IPManager";
import DomainDb, { DomainEntry } from "../db/DomainDb";
import DigitalOcean from "do-wrapper";

const logManager = LogManager.getInstance();

class DOManager {

  private static _instance?: DOManager;

  /**
   * Get the DOManager instance.
   */
  static getInstance() {
    if (!DOManager._instance) {
      DOManager._instance = new DOManager();
    }
    return DOManager._instance;
  }

  private readonly _db: DomainDb;
  private readonly _subdomainDb: SubdomainDb;
  private readonly _settingsDb: SettingsDb;
  private readonly _ipManager: IPManager;
  private _do?: DigitalOcean;

  constructor() {
    this._db = DomainDb.getInstance();
    this._subdomainDb = SubdomainDb.getInstance();
    this._settingsDb = SettingsDb.getInstance();
    this._ipManager = IPManager.getInstance();
  }

  /**
   * Check to see if the public IP address has changed. If so,
   * update the domains & subdomains in DigitalOcean.
   */
  async checkIPUpdates() {
    const settings = await this._settingsDb.get("0");
    // TODO: Digital Ocean API Key secure storage
    if (!this.isInitialized() && settings.apiKey !== "") {
      logManager.addLog("Initializing the Digital Ocean API now that an API key has been set.");
      this.initialize(settings.apiKey);
    } else if (settings.apiKey === "") {
      logManager.addLog("The Digital Ocean API key still needs to be defined in settings.");
    }

    // check to see if the public IP has changed since we last looked.
    const lastKnownIP = await this._ipManager.getLastKnownIP();
    const currentIP = await this._ipManager.getCurrentIP();
    if (lastKnownIP !== currentIP)
      logManager.addLog(`A new public-facing IP address has been found: ${currentIP}`);
    else
      logManager.addLog(`Same old public-facing IP address...: ${currentIP}`);

    if (this.isInitialized()) {
      logManager.addLog("Getting updates from Digital Ocean");
      await this.getAllDomains();

      const domains = (await this._db.getAll()).filter(d => d.active);
      const subdomains = (await this._subdomainDb.getAll()).filter(s => s.active && s.ip !== currentIP).map(s => {
        s.name = s.name.substring(0, s.name.length);
        return s;
      });
      domains.forEach(domain => {
        // find the subdomains for the current domain
        const subdomainsForDomain = subdomains.filter(s => s.domain === domain.name);
        if (subdomainsForDomain.length === 0) return;

        logManager.addLog(`Updating domain '${domain}' to resolve to IP address '${currentIP}'`);

        // update the A name for each subdomain
        subdomainsForDomain.forEach(subdomain => {
          logManager.addLog(`Updating subdomain '${subdomain.name}' to resolve to IP address '${currentIP}'`);
          this.findAndUpdateANameRecordForSubdomain(domain.name, subdomain.name, currentIP);
        });
      });
    }
  }

  /**
   * Check to see if the DOManager is initialized.
   */
  isInitialized() {
    return this._do !== undefined;
  }

  /**
   * Update an A Name record with a new IP address.
   * @param domain the domain.
   * @param subdomain the subdomain.
   * @param recordID the id of the A Name record.
   * @param ip the IP address to assign to the A Name record.
   */
  updateANameRecord(domain: string, subdomain: string, recordID: string, ip: string) {
    if (!this._do) {
      console.error("DO not yet initialized");
      return Promise.resolve();
    }
    return this._do.domains.updateRecord(domain, recordID, { type: "A", name: subdomain, data: ip, ttl: 1800, tag: "issue" })
      .then(() => {
        // TODO: log in a new table that we updated the subdomain with a new value at this time.
        // update the domains & subdomains from DigitalOcean
        this.getAllDomains();
      });
  }

  /**
   * Find and update a DigitalOcean domain's A name record for a subdomain.
   * @param domain the domain.
   * @param subdomain the subdomain
   * @param publicIP the public IP.
   */
  findAndUpdateANameRecordForSubdomain(domain: string, subdomain: string, publicIP: string): Promise<void> {
    const aNameValue = calculateANameValueForSubdomain(domain, subdomain);
    console.log(`A Name for ${subdomain}: ${aNameValue}`);

    return this.getMatchingDOANameRecord(domain, aNameValue)
      .then(record => {
        if (record) return this.updateANameRecord(domain, subdomain, record.id, publicIP);
      });
  };

  /**
   * Get all domains registered in Digital Ocean.
   */
  getAllDomains() {
    if (!this._do) {
      console.error("DO not yet initialized");
      return Promise.resolve([]);
    }

    return this._do.domains.getAll('issue')
      .then(({ domains }) => {
        if (domains) {
          domains.forEach((domain: DomainEntry) => this._registerDomain(domain));
        }
        return domains;
      });
  }

  /**
   * Get the matching A Name record entry in DigitalOcean.
   * @param domain the domain.
   * @param aNameValue the A Name value to search for.
   * @returns the A Name record entry or null.
   */
  getMatchingDOANameRecord(domain: string, aNameValue: string) {
    if (!this._do) {
      console.error("DO not yet initialized");
      return Promise.resolve(null);
    }
    return this._do.domains.getAllRecords(domain, 'issue')
      .then(({ domain_records }) => {
        const filtered = domain_records.filter((record: { type: string, name: string }) => record.type === "A" && record.name === aNameValue);
        return (filtered.length === 1) ? filtered[0] : null;
      });
  };

  /**
   * Initialize DigitalOcean with the API token.
   * @param apiToken the DigitalOcean api token.
   */
  initialize(apiToken: string) {
    this._do = new DigitalOcean(apiToken, 50);
  }

  /**
   * 
   * @param {*} domain the domain
   */
  _registerDomain(domain: DomainEntry) {
    return this._db.insertOrUpdateDomain(domain)
      .then(() => this._registerSubdomains(domain));
  }

  _registerSubdomains(domain: DomainEntry) {
    const zoneFile = zone.parseZoneFile(domain.zone_file);
    const subdomains = zoneFile.a.map((a: { domain: string }) => {
      a.domain = domain.name;
      return a;
    });
    subdomains.forEach((subdomain: SubdomainEntry) => this._subdomainDb.insertOrUpdateSubdomain(subdomain));
  }
}

export default DOManager;

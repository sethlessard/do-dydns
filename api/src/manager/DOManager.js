//@ts-check
const DigitalOcean = require("do-wrapper").default;
const getLogManagerInstance = require("../manager/LogManager");
const ANameHelper = require("../ANameHelper");
const getDomainDbInstance = require("../db/DomainDb");
const zone = require("zone-file");
const getSubdomainDbInstance = require("../db/SubdomainDb");
const getSettingsDbInstance = require("../db/SettingsDb");
const getIPManagerInstance = require("./IPManager");

const logManager = getLogManagerInstance();

let _instance = null;

/**
 * Get the DOManager instance.
 * @returns {DOManager} the DOManager instance.
 */
const getDOManagerInstance = () => {
  if (_instance === null) {
    _instance = new DOManager();
  }
  return _instance;
};

class DOManager {

  constructor() {
    this._db = getDomainDbInstance();
    this._subdomainDb = getSubdomainDbInstance();
    this._settingsDb = getSettingsDbInstance();
    this._ipManager = getIPManagerInstance();
    this._do = null;
  }

  /**
   * Check to see if the public IP address has changed. If so,
   * update the domains & subdomains in DigitalOcean.
   * @returns {Promise<void>}
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
   * @returns {boolean} true if initialized, false if not.
   */
  isInitialized() {
    return this._do !== null;
  }

  /**
   * Update an A Name record with a new IP address.
   * @param {string} domain the domain.
   * @param {string} subdomain the subdomain.
   * @param {string} recordID the id of the A Name record.
   * @param {string} ip the IP address to assign to the A Name record.
   */
  updateANameRecord(domain, subdomain, recordID, ip) {
    if (!this._do) {
      console.error("DO not yet initialized");
      return;
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
   * @param {string} domain the domain.
   * @param {string} subdomain the subdomain
   * @param {string} publicIP the public IP.
   */
  findAndUpdateANameRecordForSubdomain(domain, subdomain, publicIP) {
    const aNameValue = ANameHelper.calculateANameValueForSubdomain(domain, subdomain);
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
    return this._do.domains.getAll('issue')
      .then(({ domains }) => {
        if (domains) {
          domains.forEach(domain => this._registerDomain(domain));
        }
        return domains;
      });
  }

  /**
   * Get the matching A Name record entry in DigitalOcean.
   * @param {string} domain the domain.
   * @pararm {string} aNameValue the A Name value to search for.
   * @returns {Promise<object | null>} the A Name value. 
   */
  getMatchingDOANameRecord(domain, aNameValue) {
    return this._do.domains.getAllRecords(domain, 'issue')
      .then(({ domain_records }) => {
        const filtered = domain_records.filter(record => record.type === "A" && record.name === aNameValue);
        return (filtered.length === 1) ? filtered[0] : null;
      });
  };

  /**
   * Initialize DigitalOcean with the API token.
   * @param {string} apiToken the DigitalOcean api token.
   */
  initialize(apiToken) {
    this._do = new DigitalOcean(apiToken, 50);
  }

  /**
   * 
   * @param {*} domain the domain
   */
  _registerDomain(domain) {
    return this._db.insertOrUpdateDomain(domain)
      .then(() => this._registerSubdomains(domain));
  }

  _registerSubdomains(domain) {
    const zoneFile = zone.parseZoneFile(domain["zone_file"]);
    const subdomains = zoneFile.a.map(a => {
      a.domain = domain.name;
      return a;
    });
    subdomains.forEach(subdomain => this._subdomainDb.insertOrUpdateSubdomain(subdomain));
  }
}

module.exports = getDOManagerInstance;

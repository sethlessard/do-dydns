const DigitalOcean = require("do-wrapper").default;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const ANameHelper = require("./src/ANameHelper");
const getIPManagerInstance = require("./src/manager/IPManager");
const getSubdomainDbInstance = require("./src/db/SubdomainDb");
const routes = require("./src/route");
const domainRoutes = require("./src/route/domain");
const ipRoutes = require("./src/route/ip");
const logRoutes = require("./src/route/log");
const settingsRoutes = require("./src/route/settings");
const subdomainRoutes = require("./src/route/subdomains");
const getIPDbInstance = require("./src/db/IPDb");
const getLogManagerInstance = require("./src/manager/LogManager");
const getLogDbInstance = require("./src/db/LogDb");

dotenv.config();

// environment variables
const API_TOKEN = process.env.API_TOKEN || "";
const domain = process.env.DOMAIN || "";
const subdomains = (process.env.SUBDOMAINS) ? process.env.SUBDOMAINS.split(",") : [];

if (API_TOKEN === "")
  console.warn("API_TOKEN environment variable not set.");


const api = new DigitalOcean(API_TOKEN, 10);
const ipManager = getIPManagerInstance();

// get the log manager
const logManager = getLogManagerInstance();
logManager.addLog("SYSTEM START");

// initialize the databases
const ipDB = getIPDbInstance();
const subdomainDB = getSubdomainDbInstance();

// initialize express
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// load the routes
app.use(routes);
app.use("/domain", domainRoutes);
app.use("/ip", ipRoutes);
app.use("/log", logRoutes);
app.use("/settings", settingsRoutes);
app.use("/subdomain", subdomainRoutes);
app.listen(3080, "0.0.0.0", logManager.addLog("api listening on 0.0.0.0:3080"));

// TODO: register a 404 handler

/**
 * Check to see if the public IP address has changed. If so,
 * it will update the domain entry in DigitalOcean.
 * @returns {Promise<void>}
 */
const checkIPUpdates = async () => {
  const lastKnownIP = await ipManager.getLastKnownIP();
  const currentIP = await ipManager.getCurrentIP();

  if (lastKnownIP !== currentIP) {
    logManager.addLog(`There is a new IP Address: ${currentIP}`);

    if (domain === "") {
      logManager.addLog("No domain specified in the DOMAIN environment variable. Doing nothing.");
      return;
    }

    const recordsToBeUpdated = [domain, ...subdomains];

    recordsToBeUpdated.forEach(d => findAndUpdateDomainANameRecordForSubdomain(domain, d, currentIP));
  } else {
    logManager.addLog(`Same old IP... ${lastKnownIP}`);
  }
};

/**
 * Get the matching A Name record entry in DigitalOcean.
 * @param {string} domain the domain.
 * @pararm {string} aNameValue the A Name value to search for.
 * @returns {Promise<object | null>} the A Name value. 
 */
const getMatchingDOANameRecord = (domain, aNameValue) => {
  return api.domainRecordsGetAll(domain)
  .then(response => {
    const filtered = response.body["domain_records"].filter(record => record.type === "A" && record.name === aNameValue);
    return (filtered.length === 1) ? filtered[0] : null;
  });
};

/**
 * Update the A Name record for a subdomain in DigitalOcean with the 
 * current public IP address.
 * @param {string} domain the domain.
 * @param {string} id the id of the A Name entry.
 * @param {string} ip the public IP address.
 */
const updateANameRecord = (domain, id, ip) => {
  return api.domainRecordsUpdate(domain, id, { data: ip });
};

/**
 * Find and update a DigitalOcean domain's A name record for a subdomain.
 * @param {string} domain the domain.
 * @param {string} subdomain the subdomain
 * @param {string} publicIP the public IP.
 */
const findAndUpdateDomainANameRecordForSubdomain = (domain, subdomain, publicIP) => {
  const aNameValue = ANameHelper.calculateANameValueForSubdomain(domain, subdomain);
  console.log(`A Name for ${subdomain}: ${aNameValue}`);

  return getMatchingDOANameRecord(domain, aNameValue)
  .then(record => {
    if (record) {
      return updateANameRecord(domain, record.id, publicIP)
    }
  });
};

const interval = setInterval(checkIPUpdates, 1000 * 60 * 15);
checkIPUpdates();

process.on("exit", () => {
  logManager.addLog("SYSTEM SHUTTING DOWN");
  // close the databases
  getLogDbInstance().close();
  ipDB.close();
  subdomainDB.close();
  clearInterval(interval);
})

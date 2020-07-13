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
const getSettingsDbInstance = require("./src/db/SettingsDb");
const getDomainDbInstance = require("./src/db/DomainDb");
const getDOManagerInstance = require("./src/manager/DOManager");

dotenv.config();

// environment variables
const domain = process.env.DOMAIN || "";
const subdomains = (process.env.SUBDOMAINS) ? process.env.SUBDOMAINS.split(",") : [];

const ipManager = getIPManagerInstance();

// get the log manager
const logManager = getLogManagerInstance();
logManager.addLog("SYSTEM START");

// initialize the databases
const domainDb = getDomainDbInstance();
const ipDB = getIPDbInstance();
const logDb = getLogDbInstance();
const subdomainDB = getSubdomainDbInstance();
const settingsDb = getSettingsDbInstance();

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
app.listen(3080, "0.0.0.0", logManager.addLog("Api listening at: 0.0.0.0:3080"));

// TODO: register a 404 handler

const doManager = getDOManagerInstance();

/**
 * Check to see if the public IP address has changed. If so,
 * it will update the domain entry in DigitalOcean.
 * @returns {Promise<void>}
 */
const checkIPUpdates = async () => {
  const lastKnownIP = await ipManager.getLastKnownIP();
  const currentIP = await ipManager.getCurrentIP();

  if (lastKnownIP !== currentIP) {
    logManager.addLog(`A new public-facing IP address has been found: ${currentIP}`);

    if (domain === "") {
      logManager.addLog("No domain specified in the DOMAIN environment variable. Doing nothing.");
      return;
    }

    const recordsToBeUpdated = [domain, ...subdomains];

    recordsToBeUpdated.forEach(subdomain => doManager.findAndUpdateANameRecordForSubdomain(domain, subdomain, currentIP));
  } else {
    logManager.addLog(`Same old public-facing IP address...: ${lastKnownIP}`);
  }
};

const interval = setInterval(checkIPUpdates, 1000 * 60 * 15);
checkIPUpdates();

process.on("exit", () => {
  logManager.addLog("SYSTEM SHUTTING DOWN");
  // close the databases
  domainDb.close();
  ipDB.close();
  logDb.close();
  settingsDb.close();
  subdomainDB.close();
  clearInterval(interval);
});

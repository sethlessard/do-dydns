const DigitalOcean = require("do-wrapper").default;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");

const ANameHelper = require("./src/ANameHelper");
const getIPManagerInstance = require("./src/manager/IPManager");
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
const getSubdomainDbInstance = require("./src/db/SubdomainDb");
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
const subdomainDb = getSubdomainDbInstance();
const ipDB = getIPDbInstance();
const logDb = getLogDbInstance();
const settingsDb = getSettingsDbInstance();

// initialize express
const app = express();
app.use(helmet()); 
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// load the routes
app.use(routes);
app.use("/domain", domainRoutes);
app.use("/ip", ipRoutes);
app.use("/log", logRoutes);
app.use("/settings", settingsRoutes);
app.use("/subdomain", subdomainRoutes);
app.listen(3080, "0.0.0.0", logManager.addLog("Api listening at: 0.0.0.0:3080"));

// 404 handler
app.use((req, res) => {
  res.status(404).send("not found");
});

const doManager = getDOManagerInstance();

/**
 * Check to see if the public IP address has changed. If so,
 * it will update the domain entry in DigitalOcean.
 * @returns {Promise<void>}
 */
const checkIPUpdates = async () => {
  const settings = await settingsDb.get("0");
  // TODO: Digital Ocean API Key secure storage
  if (!doManager.isInitialized() && settings.apiKey !== "") {
    logManager.addLog("Initializing the Digital Ocean API now that an API key has been set.");
    doManager.initialize(settings.apiKey);
  } else if (settings.apiKey === "") {
    logManager.addLog("The Digital Ocean API key still needs to be defined in settings.");
  }

  if (doManager.isInitialized()) {
    logManager.addLog("Getting updates from Digital Ocean");
    await doManager.getAllDomains(); 
  }
  
  // check to see if the public IP has changed since we last looked.
  const lastKnownIP = await ipManager.getLastKnownIP();
  const currentIP = await ipManager.getCurrentIP();
  if (lastKnownIP !== currentIP) {
    logManager.addLog(`A new public-facing IP address has been found: ${currentIP}`);

    const domains = (await domainDb.getAll()).filter(d => d.active).map(d => d.name);
    const subdomains = (await subdomainDb.getAll()).filter(s => s.active).map(s => s.name.splice(s.name.length - 1, 1));

    const recordsToBeUpdated = [...domains, ...subdomains];

    recordsToBeUpdated.forEach(subdomain => doManager.findAndUpdateANameRecordForSubdomain(domain, subdomain, currentIP));
  } else {
    logManager.addLog(`Same old public-facing IP address...: ${lastKnownIP}`);
  }
};

let interval = null;
(async () => {
  const settings = await settingsDb.get("0");
  interval = setInterval(checkIPUpdates, settings.networkUpdateInterval);
  checkIPUpdates();
})();

process.on("exit", () => {
  logManager.addLog("SYSTEM SHUTTING DOWN");
  // close the databases
  domainDb.close();
  subdomainDb.close();
  ipDB.close();
  logDb.close();
  settingsDb.close();
  clearInterval(interval);
});

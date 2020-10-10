const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");

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
const getIPManagerInstance = require("./src/manager/IPManager");

(async () => {
  dotenv.config();

  // environment variables
  const host = process.env.HOST || "0.0.0.0"
  const port = process.env.PORT || 3080;

  // get the log manager
  const logManager = getLogManagerInstance();
  logManager.addLog("SYSTEM START");

  // initialize the databases
  const domainDb = getDomainDbInstance();
  const subdomainDb = getSubdomainDbInstance();
  const ipDB = getIPDbInstance();
  const logDb = getLogDbInstance();
  const settingsDb = getSettingsDbInstance();
  await settingsDb._initialize();

  const doManager = getDOManagerInstance();

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
  app.listen(port, host, console.log(`Api listening at: ${host}:${port}`));

  // 404 handler
  app.use((_, res) => {
    res.status(404).send("not found");
  });

  const settings = await settingsDb.get("0");
  const interval = setInterval(() => checkIPUpdates(doManager, logManager, settingsDb, domainDb, subdomainDb), settings.networkUpdateIntervalMinutes * 60 * 1000);
  checkIPUpdates(doManager, logManager, settingsDb, domainDb, subdomainDb);

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
})();

/**
  * Check to see if the public IP address has changed. If so,
  * it will update the domain entry in DigitalOcean.
  * @param {DOManager} doManager the do manager instance.
  * @param {LogManager} doManager the log manager instance.
  * @param {SettingsDb} settingsDb the Settings DB.
  * @param {DomainDb} domainDb the Domain DB.
  * @param {SubdomainDB } sudbomainDb the Subdomain DB.
  * @returns {Promise<void>}
  */
const checkIPUpdates = async (doManager, logManager, settingsDb, domainDb, subdomainDb) => {
  const ipManager = getIPManagerInstance();
  const settings = await settingsDb.get("0");
  // TODO: Digital Ocean API Key secure storage
  if (!doManager.isInitialized() && settings.apiKey !== "") {
    logManager.addLog("Initializing the Digital Ocean API now that an API key has been set.");
    doManager.initialize(settings.apiKey);
  } else if (settings.apiKey === "") {
    logManager.addLog("The Digital Ocean API key still needs to be defined in settings.");
  }

  // check to see if the public IP has changed since we last looked.
  const lastKnownIP = await ipManager.getLastKnownIP();
  const currentIP = await ipManager.getCurrentIP();
  if (lastKnownIP !== currentIP)
    logManager.addLog(`A new public-facing IP address has been found: ${currentIP}`);
  else
    logManager.addLog(`Same old public-facing IP address...: ${currentIP}`);

  if (doManager.isInitialized()) {
    logManager.addLog("Getting updates from Digital Ocean");
    await doManager.getAllDomains();

    const domains = (await domainDb.getAll()).filter(d => d.active);
    const subdomains = (await subdomainDb.getAll()).filter(s => s.active && s.ip !== currentIP).map(s => {
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
        doManager.findAndUpdateANameRecordForSubdomain(domain.name, subdomain.name, currentIP);
      });
    });
  }
};

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
  const interval = setInterval(() => doManager.checkIPUpdates(doManager, logManager, settingsDb, domainDb, subdomainDb), settings.networkUpdateIntervalMinutes * 60 * 1000);
  doManager.checkIPUpdates(doManager, logManager, settingsDb, domainDb, subdomainDb);

  process.on("exit", () => {
    logManager.addLog("SYSTEM SHUT DOWN");
    // close the databases
    domainDb.close();
    subdomainDb.close();
    ipDB.close();
    logDb.close();
    settingsDb.close();
    clearInterval(interval);
  });
})();

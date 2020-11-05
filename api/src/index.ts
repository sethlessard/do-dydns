import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";

import routes from "./route";
import domainRoutes from "./route/domain";
import ipRoutes from "./route/ip";
import logRoutes from "./route/log";
import settingsRoutes from "./route/settings";
import subdomainRoutes from "./route/subdomains";
import LogManager from "./manager/LogManager";
import DomainDb from "./db/DomainDb";
import SubdomainDb from "./db/SubdomainDb";
import IPDb from "./db/IPDb";
import LogDb from "./db/LogDb";
import SettingsDb from "./db/SettingsDb";
import DOManager from "./manager/DOManager";

(async () => {
  dotenv.config();

  // environment variables
  const host = process.env.HOST || "0.0.0.0"
  const port = (process.env.PORT) ? parseInt(process.env.PORT) : 3080;

  // initialize the databases
  const domainDb = DomainDb.getInstance();
  const subdomainDb = SubdomainDb.getInstance();
  const ipDB = IPDb.getInstance();
  const logDb = LogDb.getInstance();
  const settingsDb = SettingsDb.getInstance();
  await Promise.all([
    domainDb.initialize(),
    subdomainDb.initialize(),
    ipDB.initialize(),
    logDb.initialize(),
    settingsDb.initialize()
  ]);

  // get the log manager
  const logManager = LogManager.getInstance();
  logManager.addLog("SYSTEM START");

  const doManager = DOManager.getInstance();

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
  app.listen(port, host, () => console.log(`Api listening at: ${host}:${port}`));

  // 404 handler
  app.use((_, res) => {
    res.status(404).send("not found");
  });

  const settings = await settingsDb.get("0");
  const interval = setInterval(() => doManager.checkIPUpdates(), settings.networkUpdateIntervalMinutes * 60 * 1000);
  doManager.checkIPUpdates();

  process.on("exit", () => {
    logManager.addLog("SYSTEM SHUT DOWN");
    clearInterval(interval);
  });
})();

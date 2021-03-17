/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import * as express from 'express';

// const app = express();

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to api!' });
// });

// const port = process.env.port || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

import "reflect-metadata";
import * as express from "express";
import { json } from "body-parser";
import * as helmet from "helmet";
import morgan from "morgan";
// import cors from "cors";
import { container } from "tsyringe";

// import and activate the data layer
import { initializeDatabases } from "./app/data";
import { IPRoutes } from "./app/presentation/routes/IPRoutes";
import { LogRoutes } from "./app/presentation/routes/LogRoutes";
import { DomainRoutes } from "./app/presentation/routes/DomainRoutes";
import { getIPRepositoryImpl } from "./app/data/datasources/repositories/IPRepositoryImpl";
import { getLogRepositoryImpl } from "./app/data/datasources/repositories/LogRepositoryImpl";
import { getSubdomainRepositoryImpl } from "./app/data/datasources/repositories/SubdomainRepositoryImpl";
import { getDomainRepositoryImpl } from "./app/data/datasources/repositories/DomainRepositoryImpl";
import { getSettingsRepositoryImpl } from "./app/data/datasources/repositories/SettingsRepositoryImpl";
import { DOV2ServiceImpl } from "./app/data/datasources/service/DOV2ServiceImpl";
import { IPServiceImpl } from "./app/data/datasources/service/IPServiceImpl";
import { ZoneFileParserServiceImpl } from "./app/data/datasources/service/ZoneFileParserServiceImpl";

// read env variables
const PORT = (process.env.port) ? parseInt(process.env.port) : 3333;
const HOST = process.env.host ?? "0.0.0.0";

// initialize the database connection
initializeDatabases()
  .then(() => {
    // register the application dependencies
    container.register("DomainRepository", { useValue: getDomainRepositoryImpl() });
    container.register("IPRepository", { useValue: getIPRepositoryImpl() });
    container.register("LogRepository", { useValue: getLogRepositoryImpl() });
    container.register("SettingsRepository", { useValue: getSettingsRepositoryImpl() });
    container.register("SubdomainRepository", { useValue: getSubdomainRepositoryImpl() });
    container.register("DOService", { useClass: DOV2ServiceImpl });
    container.register("IPService", { useClass: IPServiceImpl });
    container.register("DOService", { useClass: ZoneFileParserServiceImpl });
    // TODO: add constants

    // create the express app
    const app = express();
    app.use(json());
    app.use(morgan("dev"));
    app.use(helmet());
    // app.use(cors());

    // register the routes
    // ip routes
    app.use("api/v1/ip", container.resolve(IPRoutes).getRouter());
    // log routes
    app.use("api/v1/log", container.resolve(LogRoutes).getRouter());
    // domain routes
    app.use("api/v1/domain", container.resolve(DomainRoutes).getRouter());

    // start listening
    app.listen(PORT, HOST, () => {
      console.log(`DO-DyDns API listening at: '${HOST}:${PORT}'`);
    });

    process.on("exit", () => {
      // TODO: cleanup
    });
  })
  .catch(err => {
    console.error(`Error initializing the DO-DyDns API: ${err}`);
    process.exit(1);
  });

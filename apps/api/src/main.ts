import "reflect-metadata";
import * as express from "express";
import { json } from "body-parser";
import * as helmet from "helmet";
import morgan from "morgan";
import { container } from "tsyringe";

// import and activate the data layer
import { initializeDataLayer } from "./app/data";
import { IPRoutes } from "./app/presentation/routes/IPRoutes";
import { LogRoutes } from "./app/presentation/routes/LogRoutes";
import { DomainRoutes } from "./app/presentation/routes/DomainRoutes";
import { getIPRepositoryImpl } from "./app/data/datasources/repositories/IPRepositoryImpl";
import { getLogRepositoryImpl } from "./app/data/datasources/repositories/LogRepositoryImpl";
import { getSubdomainRepositoryImpl } from "./app/data/datasources/repositories/SubdomainRepositoryImpl";
import { getDomainRepositoryImpl } from "./app/data/datasources/repositories/DomainRepositoryImpl";
import { getSettingsRepositoryImpl } from "./app/data/datasources/repositories/SettingsRepositoryImpl";
import { DOV2ServiceImpl } from "./app/data/datasources/service/DOV2ServiceImpl";
import { ZoneFileParserServiceImpl } from "./app/data/datasources/service/ZoneFileParserServiceImpl";
import { WatchForIPUpdatesUseCase } from "./app/domain/usecases/ip/WatchForIPUpdatesUseCase/WatchForIPUpdatesUseCase";
import { IPServiceImpl } from "./app/data/datasources/service/IPServiceImpl";
import { SettingsRoutes } from "./app/presentation/routes/SettingsRoutes";

// read env variables
const PORT = (process.env.port) ? parseInt(process.env.port) : 3333;
const HOST = process.env.host ?? "0.0.0.0";

let watchForIPUpdatesUseCase: WatchForIPUpdatesUseCase;

// register the IPService dependency (initializeDataLayer() depdends on this)
container.registerSingleton("IPService", IPServiceImpl);

// initialize the database connection
initializeDataLayer()
  .then(() => {
    // register the application dependencies
    container.register("DomainRepository", { useValue: getDomainRepositoryImpl() });
    container.register("IPRepository", { useValue: getIPRepositoryImpl() });
    container.register("LogRepository", { useValue: getLogRepositoryImpl() });
    container.register("SettingsRepository", { useValue: getSettingsRepositoryImpl() });
    container.register("SubdomainRepository", { useValue: getSubdomainRepositoryImpl() });
    container.register("ZoneFileParserService", { useClass: ZoneFileParserServiceImpl });
    container.register("DOService", { useClass: DOV2ServiceImpl });

    // create the express app
    const app = express();
    app.use(json());
    app.use(morgan("dev"));
    app.use(helmet());

    // register the routes
    // ip routes
    app.use("/api/v1/ip", container.resolve(IPRoutes).getRouter());
    // log routes
    app.use("/api/v1/log", container.resolve(LogRoutes).getRouter());
    // domain routes
    app.use("/api/v1/domain", container.resolve(DomainRoutes).getRouter());
    // settings routes
    app.use("/api/v1/settings", container.resolve(SettingsRoutes).getRouter());

    // start the API
    app.listen(PORT, HOST, () => {
      console.log(`DO-DyDns API listening at: '${HOST}:${PORT}'`);
    });

    // start listening for updates to the public-facing IP-address
    watchForIPUpdatesUseCase = container.resolve(WatchForIPUpdatesUseCase);
    watchForIPUpdatesUseCase.execute();
    process.on("exit", () => {
      // TODO: cleanup
      watchForIPUpdatesUseCase.stopWatching();
    });
  })
  .catch(err => {
    console.error(`Error initializing the DO-DyDns API: ${err}`);
    process.exit(1);
  });

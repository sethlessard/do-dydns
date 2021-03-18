import { createConnection } from "typeorm";
import { container } from "tsyringe";

import { TypeormConnectionRegister } from "./TypeormConnectionRegister";
import {DomainModel} from "./models/DomainModel";
import {IPAddressModel} from "./models/IPAddressModel";
import {LogModel} from "./models/LogModel";
import {SettingsModel} from "./models/SettingsModel";
import {SubdomainModel} from "./models/SubdomainModel";
import { BetterSqlite3ConnectionOptions } from "typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions";
import { getIPRepositoryImpl } from "./datasources/repositories/IPRepositoryImpl";
import { IPServiceImpl } from "./datasources/service/IPServiceImpl";

/**
 * Initialize the database connections.
 */
export function initializeDataLayer(): Promise<void> {
  const connectionOptions: BetterSqlite3ConnectionOptions = {
    type: "better-sqlite3",
    database: "do-dydns.db",
    entities: [
      DomainModel,
      IPAddressModel,
      LogModel,
      SettingsModel,
      SubdomainModel
    ],
    // logging: ["query", "error", "schema"],
    synchronize: true
  };
  return createConnection(connectionOptions)
    .then(connection => {
      TypeormConnectionRegister.getInstance().registerConnection(connection);
      
      const ipService: IPServiceImpl = container.resolve("IPService");
      const ipRepository = getIPRepositoryImpl();
      // update the last known public-facing IP address in the IPService 
      return ipRepository.getIP()
        .then(ip => ipService.setLastKnownIP(ip));
    });
}

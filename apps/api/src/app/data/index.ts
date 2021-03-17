import { createConnection } from "typeorm";
import { TypeormConnectionRegister } from "./TypeormConnectionRegister";
import {DomainModel} from "./models/DomainModel";
import {IPAddressModel} from "./models/IPAddressModel";
import {LogModel} from "./models/LogModel";
import {SettingsModel} from "./models/SettingsModel";
import {SubdomainModel} from "./models/SubdomainModel";

/**
 * Initialize the database connections.
 */
export async function initializeDatabases(): Promise<void> {
  console.log(__dirname);
  TypeormConnectionRegister.getInstance().registerConnection(await createConnection({
    type: "better-sqlite3",
    database: "do-dydns.db",
    entities: [
      DomainModel,
      IPAddressModel,
      LogModel,
      SettingsModel,
      SubdomainModel
    ]
  }));
}

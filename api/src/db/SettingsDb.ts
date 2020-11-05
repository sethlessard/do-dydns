import Database, { DatabaseEntry } from "./Database";

export interface SettingsEntry extends DatabaseEntry {
  _id: "0";
  apiKey: string;
  networkUpdateIntervalMinutes: number;
}

class SettingsDb extends Database<SettingsEntry> {

  private static _instance?: SettingsDb;

  /**
   * Get the SettingsDb instance.
   */
  static getInstance(): SettingsDb {
    if (!SettingsDb._instance) {
      SettingsDb._instance = new SettingsDb();
    }
    return SettingsDb._instance;
  }

  constructor() {
    super({ name: "Settings" });
  }
 
  /**
   * Initialize the SettingsDb.
   */
  initialize() {
    return super.initialize()
      .then(() => {
        this.insert({
          _id: "0",
          apiKey: "",
          networkUpdateIntervalMinutes: 15
        });
      })
  }
}

export default SettingsDb;

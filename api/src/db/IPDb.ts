import Database, { DatabaseEntry } from "./Database";

export interface IPEntry extends DatabaseEntry {
  _id: string;
  publicIP: string;
};

class IPDb extends Database<IPEntry> {

  private static _instance?: IPDb;

  /**
   * Get the IPDb instance.
   */
  static getInstance(): IPDb {
    if (!IPDb._instance) {
      IPDb._instance = new IPDb();
    }
    return IPDb._instance;
  }

  constructor() {
    super({ name: "IP" });
  }

  /**
   * Initialize the IP Database.
   */
  initialize() {
    return super.initialize()
      .then(() => {
        this.insert({ _id: "0", publicIP: "" });
      });
  }
}

export default IPDb;

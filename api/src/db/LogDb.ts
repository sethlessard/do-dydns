import Database, { DatabaseEntry } from "./Database";

export interface LogEntry extends DatabaseEntry {
  message: string;
};

class LogDb extends Database<LogEntry> {

  private static _instance?: LogDb;

  /**
   * Get the LogDb instance.
   */
  static getInstance(): LogDb {
    if (!LogDb._instance) {
      LogDb._instance = new LogDb();
    }
    return LogDb._instance;
  }

  constructor() {
    super({ name: "Log" });
  }
}

export default LogDb;

import LogDb from "../db/LogDb";
import getLogDbInstance from "../db/LogDb";

class LogManager {

  private static _instance?: LogManager;

  static getInstance(): LogManager {
    if (!LogManager._instance) {
      LogManager._instance = new LogManager();
    }
    return LogManager._instance;
  }

  private readonly _db: LogDb;

  constructor() {
    this._db = LogDb.getInstance();
  }

  /**
   * Add a message to the log.
   * @param message the message to log.
   */
  addLog(message: string) {
    this._db.insert({ message });
  }

  /**
   * Get the log.
   * @returns {Promise<{ _id: string, message: string, recordCreated: number, recordUpdated: number }[]>} the log.
   */
  getLog() {
    return this._db.getAll();
  }
}

export default LogManager;

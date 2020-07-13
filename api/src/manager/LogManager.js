const getLogDbInstance = require("../db/LogDb");

let _instance = null;

/**
 * Get the LogManager instance.
 * @returns {LogManager} the LogManager instance.
 */
const getLogManagerInstance = () => {
  if (_instance === null) {
    _instance = new LogManager();
  }
  return _instance;
};

class LogManager {

  constructor() {
    this._db = getLogDbInstance();
  }

  /**
   * Add a message to the log.
   * @param {string} message the message to log.
   */
  addLog(message) {
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

module.exports = getLogManagerInstance;

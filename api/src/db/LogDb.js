const Database = require("./Database");
let _instance = null;

/**
 * Get the LogDb instance.
 * @returns {LogDb} the LogDb instance.
 */
const getLogDbInstance = () => {
  if (_instance === null) {
    _instance = new LogDb();
  }
  return _instance;
};

class LogDb extends Database {

  constructor() {
    super({ name: "Log", isLedger: true });
  }
}

module.exports = getLogDbInstance;

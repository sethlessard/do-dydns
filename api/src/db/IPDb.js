const Database = require("./Database");

let _instance = null;

/**
 * Get the IPDb instance.
 * @returns {IPDb} the IPDb instance.
 */
const getIPDbInstance = () => {
  if (_instance === null) {
    _instance = new IPDb();
  }
  return _instance;
};

class IPDb extends Database {

  constructor() {
    super({ name: "IP" });
  }

  /**
   * Initialize the IP Database.
   */
  _initialize() {
    return this.insert({ _id: "0", publicIP: "" });
  }
}

module.exports = getIPDbInstance;

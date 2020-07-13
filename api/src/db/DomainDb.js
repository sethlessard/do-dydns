const Database = require("./Database");

let _instance = null;

/**
 * Get the DomainDb instance.
 * @returns {DomainDb} the DomainDb instance.
 */
const getDomainDbInstance = () => {
  if (_instance === null) {
    _instance = new DomainDb();
  }
  return _instance;
};

class DomainDb extends Database {

  constructor() {
    super({ name: "Domain" });
  }
}

module.exports = getDomainDbInstance;

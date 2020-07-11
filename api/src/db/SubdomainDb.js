const Database = require("./Database");

let _instance = null;

/**
 * Get the SubdomainDb instance.
 * @returns {SubdomainDb} the SubdomainDb instance.
 */
const getSubdomainDbInstance = () => {
  if (_instance === null) {
    _instance = new SubdomainDb();
  }
  return _instance;
};

class SubdomainDb extends Database {

  constructor() {
    super({ name: "Subdomain" });
  }
}

module.exports = getSubdomainDbInstance;

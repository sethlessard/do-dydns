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

  /**
   * 
   * @param {{ _id?: string, name: string, ttl: number, zone_file: string, active?: boolean }} domain the domain.
   */
  insertOrUpdateDomain(domain) {
    return this.find({ name: domain.name })
      .then(foundDomain => {
        if (foundDomain) {
          foundDomain["zone_file"] = domain["zone_file"];
          foundDomain.ttl = domain.ttl
          return this.update(foundDomain);
        }
        // domains are not active for DyDns by default
        domain.active = false;
        return this.insert(domain);
      });
  }
}

module.exports = getDomainDbInstance;

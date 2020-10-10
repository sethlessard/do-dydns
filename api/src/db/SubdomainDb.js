const Database = require("./Database");

let _instance = null;

/**
 * Get the SubdomainDb instance.
 * @returns {SubdomainDb} the DomainDb instance.
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

  /**
   * Insert or update a subdomain. 
   * @param {{ _id?: string, name: string, ttl: number, ip: string, domain: string, active?: boolean }} subdomain the subdomain.
   */
  insertOrUpdateSubdomain(subdomain) {
    return this.find({ name: subdomain.name })
      .then(foundSubdomain => {
        if (foundSubdomain) {
          foundSubdomain = Object.assign(foundSubdomain, subdomain);
          return this.update(foundSubdomain);
        }
        // domains are not active for DyDns by default
        subdomain.active = false;
        return this.insert(subdomain);
      });
  }
}

module.exports = getSubdomainDbInstance;

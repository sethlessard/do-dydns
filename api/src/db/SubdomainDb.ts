import Database, { DatabaseEntry } from "./Database";

export interface SubdomainEntry extends DatabaseEntry {
  name: string;
  ttl: number;
  ip: string;
  domain: string;
  active: boolean;
};

class SubdomainDb extends Database<SubdomainEntry> {
  
  private static _instance?: SubdomainDb;

  /**
   * Get the SubdomainDb instance.
   */
  static getInstance(): SubdomainDb {
    if (!SubdomainDb._instance) {
      SubdomainDb._instance = new SubdomainDb();
    }
    return SubdomainDb._instance;
  }

  constructor() {
    super({ name: "Subdomain" });
  }

  /**
   * Insert or update a subdomain. 
   * @param subdomain the subdomain.
   */
  insertOrUpdateSubdomain(subdomain: SubdomainEntry) {
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

export default SubdomainDb;

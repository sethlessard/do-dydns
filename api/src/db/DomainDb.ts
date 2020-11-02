import Database, { DatabaseEntry } from "./Database";

export interface DomainEntry extends DatabaseEntry {
  name: string;
  ttl: number;
  zone_file: string;
  active: boolean;
};

class DomainDb extends Database<DomainEntry> {

  private static _instance?: DomainDb;

  /**
   * Get the DomainDB instance.
   */
  static getInstance(): DomainDb {
    if (!DomainDb._instance) {
      DomainDb._instance = new DomainDb();
    }
    return DomainDb._instance;
  }

  private constructor() {
    super({ name: "Domain" });
  }

  /**
   * Insert or update a domain.
   * @param domain the domain.
   */
  insertOrUpdateDomain(domain: DomainEntry) {
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

export default DomainDb;

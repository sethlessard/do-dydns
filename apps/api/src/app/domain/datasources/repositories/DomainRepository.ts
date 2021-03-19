import { DomainEntity } from "../../entities/DomainEntity";

export interface DomainRepository {
  /**
   * Clear all domain entries in the repository (this doesn't affect Digital Ocean).
   */
  clearDomainEntries(): Promise<void>;

  /**
   * Delete a DomainEntity from the repository.
   * @param domainID the ID of the domain.
   * @returns the deleted DomainEntity.
   */
  deleteDomain(domainID: string): Promise<DomainEntity>;

  /**
   * Get all active domains.
   */
  getActiveDomains(): Promise<DomainEntity[]>;

  /**
   * Get a domain by its ID.
   * @param domainID the ID of the domain.
   * @returns the domain or undefined.
   */
  getDomainByID(domainID: string): Promise<DomainEntity | undefined>;

  /**
   * Get all of the domains.
   * @returns all of the domains.
   */
  getDomains(): Promise<DomainEntity[]>;

  /**
   * Insert/update a domain into the repository.
   * @param domain the domain.
   * @returns the domain.
   */
  insertOrUpdateDomain(domain: Partial<DomainEntity>): Promise<DomainEntity>;
}

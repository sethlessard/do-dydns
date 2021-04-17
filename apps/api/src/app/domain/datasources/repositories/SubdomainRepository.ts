import { SubdomainEntity } from "../../entities/SubdomainEntity";

export interface SubdomainRepository {
  /**
   * Clear all subdomain entries in the repository (this doesn't affect Digital Ocean).
   */
  clearSubdomainEntries(): Promise<void>;

  /**
   * Delete all subdomains for a specified domain.
   * @param domainID the ID of the domain.
   * @returns the deleted subdomains.
   */
  deleteAllSubdomainsForDomain(domainID: number): Promise<SubdomainEntity[]>;

  /**
   * Delete a subdomain.
   * @param domainID the ID of the domain.
   * @param subdomainID the ID of the subdomain.
   * @returns the deleted subdomain.
   */
  deleteSubdomain(
    domainID: number,
    subdomainID: number
  ): Promise<SubdomainEntity>;

  /**
   * Get all of the active subdomains for a given domain.
   * @param domainID the ID of the domain.
   * @returns the active subdomains.
   */
  getActiveSubdomainsForDomain(domainID: number): Promise<SubdomainEntity[]>;

  /**
   * Get a subdomain by its ID
   * @param domainID the ID of the domain.
   * @param subdomainID the subdomain ID.
   * @returns the Subdomain or undefined
   */
  getSubdomainByID(
    domainID: number,
    subdomainID: number
  ): Promise<SubdomainEntity | undefined>;

  /**
   * Get all of the subdomains for a given domain.
   * @param domain the name of the domain.
   * @returns the subdomains.
   */
  getSubdomainsForDomain(domain: string): Promise<SubdomainEntity[]>;

  /**
   * Insert/update a subdomain into the repository.
   * @param subdomain the subdomain.
   * @returns the inserted/updated subdomain.
   */
  insertOrUpdateSubdomain(
    subdomain: Partial<SubdomainEntity>
  ): Promise<SubdomainEntity>;
}

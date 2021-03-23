import { SubdomainEntity } from "../../entity/SubdomainEntity";

export interface SubdomainRepository {
  /**
   * Get all the subdomains for a specified domain.
   * @param domain the name of the domain.
   */
  getSubdomainsForDomain(domain: string): Promise<SubdomainEntity[]>;
}

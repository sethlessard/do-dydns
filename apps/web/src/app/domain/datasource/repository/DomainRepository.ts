import { DomainEntity } from "../../entity/DomainEntity";

export interface DomainRepository {

  /**
   * Get all domains.
   * @returns the domains.
   */
  getAllDomains(): Promise<DomainEntity[]>;
}

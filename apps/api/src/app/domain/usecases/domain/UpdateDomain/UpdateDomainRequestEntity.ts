import { DomainEntity } from "../../../entities/DomainEntity";

export interface UpdateDomainRequestEntity {
  
  /**
   * The domain to update.
   */
  domain: DomainEntity;
}

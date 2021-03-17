import { DomainEntity } from "../../../entities/DomainEntity";

export interface DeleteDomainRequestEntity {
  
  /**
   * The domain to delete.
   */
  domain: DomainEntity;
}

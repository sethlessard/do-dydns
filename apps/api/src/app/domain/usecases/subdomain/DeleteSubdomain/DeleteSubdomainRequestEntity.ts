import { SubdomainEntity } from "../../../entities/SubdomainEntity";

export interface DeleteSubdomainRequestEntity {

  /**
   * The subdomain to delete.
   */
  subdomain: SubdomainEntity;
}

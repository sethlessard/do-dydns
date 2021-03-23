import { ApiSuccessResponse } from "../ApiSuccessResponse";
import { ApiDomainEntity } from "../entities";

export interface ApiDomainsResponse extends ApiSuccessResponse {
  /**
   * The API domain entities.
   */
  domains: ApiDomainEntity[];
}

import { ApiSuccessResponse } from "../ApiSuccessResponse";
import { ApiDomainEntity } from "../entities/ApiDomainEntity";

export interface ApiGetAllDomainsResponse extends ApiSuccessResponse {
  
  /**
   * The API domain entities.
   */
  domains: ApiDomainEntity[];
}

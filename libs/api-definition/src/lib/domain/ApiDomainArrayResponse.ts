import { ApiSuccessResponse } from "../ApiSuccessResponse";
import { ApiDomainEntity } from "../entities";

export interface ApiDomainArrayResponse extends ApiSuccessResponse {
  /**
   * The API domain entities.
   */
  domains: ApiDomainEntity[];
}

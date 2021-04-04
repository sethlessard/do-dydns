import { ApiSuccessResponse } from "@do-dydns/api-definition";
import { ApiSubdomainEntity } from "../entities";

export interface ApiSubdomainArrayResponse extends ApiSuccessResponse {
  /**
   * The subdomains.
   */
  subdomains: ApiSubdomainEntity[];
}

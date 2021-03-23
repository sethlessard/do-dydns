import { ApiSuccessResponse } from "@do-dydns/api-definition";
import { ApiSubdomainEntity } from "../entities/ApiSubdomainEntity";

export interface ApiSubdomainsResponse extends ApiSuccessResponse {
  /**
   * The subdomains.
   */
  subdomains: ApiSubdomainEntity[];
}

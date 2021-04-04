import { ApiSuccessResponse } from "@do-dydns/api-definition";
import { ApiSubdomainEntity } from "../entities";

export interface ApiSubdomainResponse extends ApiSuccessResponse {
  /**
   * The subdomain.
   */
  subdomain: ApiSubdomainEntity;
}

import { ApiSuccessResponse } from "../ApiSuccessResponse";
import { ApiDomainEntity } from "../entities";

export interface ApiDomainResponse extends ApiSuccessResponse {
  /**
   * The API domain entity.
   */
  domain: ApiDomainEntity;
}

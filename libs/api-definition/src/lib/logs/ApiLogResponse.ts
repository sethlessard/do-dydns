import { ApiLogEntity, ApiSuccessResponse } from "@do-dydns/api-definition";

export interface ApiLogResponse extends ApiSuccessResponse {
  /**
   * The DO-DyDns system logs.
   */
  logs: ApiLogEntity[];
}

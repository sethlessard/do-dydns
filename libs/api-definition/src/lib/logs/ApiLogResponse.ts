import { ApiLogEntity, ApiSuccessResponse } from "@do-dydns/api-definition";

export interface ApiLogResponse extends ApiSuccessResponse {
  success: true;

  /**
   * The DO-DyDns system logs.
   */
  logs: ApiLogEntity[];
}

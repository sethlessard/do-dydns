import { ApiSuccessResponse } from "../ApiSuccessResponse";

export interface ApiGetCurrentIPResponse extends ApiSuccessResponse {
  
  /**
   * The current public-facing IP address.
   */
  ipAddress: string;
}

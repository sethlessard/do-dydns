import { ApiSuccessResponse } from "../ApiSuccessResponse";

export interface APIIPResponse extends ApiSuccessResponse {
  /**
   * The current public-facing IP address.
   */
  ipAddress: string;
}

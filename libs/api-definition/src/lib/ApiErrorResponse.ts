import { ErrorCode } from "./errorcodes";

export interface ApiErrorResponse {
  /**
   * The response failed.
   */
  success: false;

  /**
   * The error code returned by the API.
   */
  errorCode: ErrorCode;

  /**
   * The optional message.
   */
  message?: string;
}

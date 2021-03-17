import { Response } from "express";
import { ApiErrorResponse, ErrorCode } from "@do-dydns/api-definition";

export class ExpressController {

  /**
   * Send a JSON error message.
   * @param res the express Response.
   * @param error the error to send. The error's message will be sent.
   * @param errorCode the error code to response with.
   */
  jsonError(res: Response, error: Error, errorCode = ErrorCode.General): void {
    const response: ApiErrorResponse = {
      success: false,
      message: error?.message,
      errorCode
    };
    res.status(500).json(response);
  }
}

import { APIIPResponse } from "@do-dydns/api-definition";
import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { GetCurrentIPUseCase } from "../../domain/usecases/ip/GetCurrentIPUseCase/GetCurrentIPUseCase";
import { ExpressController } from "./ExpressController";
import { RefreshIPUseCase } from "../../domain/usecases/ip/RefreshIPUseCase/RefreshIPUseCase";

@injectable()
export class IPController extends ExpressController {
  /**
   * Get the current public-facing IP address.
   * @param _ - the express request.
   * @param res - the express response.
   */
  async getCurrentIPAddress(_: Request, res: Response): Promise<void> {
    const getCurrentIPUseCase = container.resolve(GetCurrentIPUseCase);
    try {
      const result = await getCurrentIPUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }
      this.respondWithIP(res, result.payload);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Get the most up-to-date public-facing IP address.
   * @param _ the express request
   * @param res the express response
   */
  async refreshIPAddress(_: Request, res: Response): Promise<void> {
    const refreshIPUseCase = container.resolve(RefreshIPUseCase);
    try {
      const result = await refreshIPUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }
      this.respondWithIP(res, result.payload);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Response with the current public-facing IP address.
   * @param res the express response.
   * @param ipAddress the ip address.
   */
  private readonly respondWithIP = (res: Response, ipAddress: string) => {
    // build the response
    const response: APIIPResponse = {
      success: true,
      ipAddress,
    };
    res.status(200).json(response);
  };
}

import { APIIPResponse } from "@do-dydns/api-definition";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IPRepository } from "../../domain/datasources/repositories/IPRepository";
import { GetCurrentIPUseCase } from "../../domain/usecases/ip/GetCurrentIPUseCase/GetCurrentIPUseCase";
import { ExpressController } from "./ExpressController";

@injectable()
export class IPController extends ExpressController {
  /**
   * Create a new IPController.
   * @param ipRepository the IP repository.
   */
  constructor(
    @inject("IPRepository") private readonly ipRepository: IPRepository
  ) {
    super();
  }

  /**
   * Get the current public-facing IP address.
   * @param _ - the express request.
   * @param res - the express response.
   */
  async getCurrentIPAddress(_: Request, res: Response): Promise<void> {
    const getCurrentIPUseCase = new GetCurrentIPUseCase(this.ipRepository);

    try {
      const result = await getCurrentIPUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      // build the response
      const response: APIIPResponse = {
        success: true,
        ipAddress: result.payload,
      };
      res.status(200).json(response);
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
    //  TODO: refreshIPUseCase

    return this.getCurrentIPAddress(_, res);
  }
}

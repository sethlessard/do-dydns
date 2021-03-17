import { ApiGetCurrentIPResponse } from "@do-dydns/api-definition";
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
  constructor(@inject("IPRepository") private readonly ipRepository: IPRepository) {
    super();
  }

  /**
   * Get the current public-facing IP address.
   * @param _ the express request.
   * @param res the express response.
   */
  async getCurrentIPAddress(_: Request, res: Response): Promise<void> {
    const getCurrentIPUseCase = new GetCurrentIPUseCase(this.ipRepository);

    try {
      const ipResponse = await getCurrentIPUseCase.execute();
      if (ipResponse.success === false) {
        throw ipResponse.error;
      }

      // build the response
      const response: ApiGetCurrentIPResponse = {
        success: true,
        ipAddress: ipResponse.payload
      };
      res.status(200).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}

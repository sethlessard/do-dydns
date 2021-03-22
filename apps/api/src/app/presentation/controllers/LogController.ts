import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { LogRepository } from "../../domain/datasources/repositories/LogRepository";
import { DeleteLogsUseCase } from "../../domain/usecases/logs/DeleteLogsUseCase/DeleteLogsUseCase";
import { GetAllLogsUseCase } from "../../domain/usecases/logs/GetAllLogsUseCase/GetAllLogsUseCase";
import { ExpressController } from "./ExpressController";
import { ApiLogResponse } from "@do-dydns/api-definition";

@injectable()
export class LogController extends ExpressController {
  /**
   * Create a new LogController.
   * @param logRepository the log repository.
   */
  constructor(
    @inject("LogRepository") private readonly logRepository: LogRepository
  ) {
    super();
  }

  /**
   * Delete logs.
   * @param _ the express request.
   * @param res the express response.
   */
  async deleteLogs(_: Request, res: Response): Promise<void> {
    const deleteLogsUseCase = new DeleteLogsUseCase(this.logRepository);
    try {
      const result = await deleteLogsUseCase.execute();
      if (result.success === false) {
        throw result.error;
      }

      const response: ApiLogResponse = {
        success: true,
        logs: [],
      };
      res.status(200).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Get the current public-facing IP address.
   * @param _ the express request.
   * @param res the express response.
   */
  async getLogs(_: Request, res: Response): Promise<void> {
    const getLogsUseCase = new GetAllLogsUseCase(this.logRepository);

    try {
      const result = await getLogsUseCase.execute();
      if (result.success === false) {
        throw result.error;
      }

      const response: ApiLogResponse = {
        success: true,
        logs: result.payload,
      };
      res.status(200).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}

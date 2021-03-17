import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { LogRepository } from "../../domain/datasources/repositories/LogRepository";
import { DeleteLogsUseCase } from "../../domain/usecases/logs/DeleteLogsUseCase/DeleteLogsUseCase";
import { GetAllLogsUseCase } from "../../domain/usecases/logs/GetAllLogsUseCase/GetAllLogsUseCase";
import { ExpressController } from "./ExpressController";

@injectable()
export class LogController extends ExpressController {

  /**
   * Create a new LogController.
   * @param logRepository the log repository.
   */
  constructor(@inject("LogRepository") private readonly logRepository: LogRepository) {
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
      const response = await deleteLogsUseCase.execute();
      if (response.success === false) {
        throw response.error;
      }

      res.status(204).json({ deletedLogs: response.payload });
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
      const logsResponse = await getLogsUseCase.execute();
      if (logsResponse.success === false) {
        throw logsResponse.error;
      }

      res.status(200).json({ logs: logsResponse.payload });
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}

import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { DeleteLogsUseCase } from "../../domain/usecases/logs/DeleteLogsUseCase/DeleteLogsUseCase";
import { GetAllLogsUseCase } from "../../domain/usecases/logs/GetAllLogsUseCase/GetAllLogsUseCase";
import { ExpressController } from "./ExpressController";
import { ApiLogResponse } from "@do-dydns/api-definition";

@injectable()
export class LogController extends ExpressController {
  /**
   * Delete logs.
   * @param _ the express request.
   * @param res the express response.
   */
  async deleteLogs(_: Request, res: Response): Promise<void> {
    const deleteLogsUseCase = container.resolve(DeleteLogsUseCase);
    try {
      const result = await deleteLogsUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      res.status(204).end();
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
    const getAllLogsUseCase = container.resolve(GetAllLogsUseCase);
    try {
      const result = await getAllLogsUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
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

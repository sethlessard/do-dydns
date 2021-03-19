import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { ApiSettingsResponse } from "@do-dydns/api-definition";
import { GetSettingsUseCase } from "../../domain/usecases/settings/GetSettingsUseCase/GetSettingsUseCase";
import { ExpressController } from "./ExpressController";
import { UpdateSettingsUseCase } from "../../domain/usecases/settings/UpdateSettingsUseCase/UpdateSettingsUseCase";
import { ResetSettingsUseCase } from "../../domain/usecases/settings/ResetSettingsUseCase/ResetSettingsUseCase";

@injectable()
export class SettingsController extends ExpressController {
  /**
   * Get the DO-DyDns settings.
   * @param _ the express request.
   * @param res the express response.
   */
  async getSettings(_: Request, res: Response): Promise<void> {
    const getSettingsUseCase = container.resolve(GetSettingsUseCase);

    try {
      const result = await getSettingsUseCase.execute();
      if (result.success === false) {
        // TODO: handle errorCode
        this.jsonError(res, result.error);
        return;
      }
      const response: ApiSettingsResponse = {
        success: true,
        settings: result.payload,
      };
      res.status(200).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Reset the DO-DyDns settings.
   * @param _ the express request.
   * @param res the express response.
   */
  async resetSettings(_: Request, res: Response): Promise<void> {
    const resetSettingsUseCase = container.resolve(ResetSettingsUseCase);

    try {
      const result = await resetSettingsUseCase.execute();
      if (result.success === false) {
        // TODO: handle errorCode
        this.jsonError(res, result.error);
        return;
      }

      const response: ApiSettingsResponse = {
        success: true,
        settings: result.payload,
      };
      res.status(200).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Update the DO-DyDns settings.
   * @param req the express request.
   * @param res the express response.
   */
  async updateSettings(req: Request, res: Response): Promise<void> {
    const { apiKey, networkUpdateIntervalMinutes } = req.body;
    const updateSettingsUseCase = container.resolve(UpdateSettingsUseCase);

    try {
      updateSettingsUseCase.setRequestParam({
        settings: {
          id: "0",
          apiKey,
          networkUpdateIntervalMinutes,
          created: 0,
          updated: 0,
        },
      });
      const result = await updateSettingsUseCase.execute();
      if (result.success === false) {
        // TODO: handle errorCode
        this.jsonError(res, result.error);
        return;
      }
      const response: ApiSettingsResponse = {
        success: true,
        settings: result.payload,
      };
      res.status(200).json(response);
    } catch (error) {
      this.jsonError(res, error);
    }
  }
}

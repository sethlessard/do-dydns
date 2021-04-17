import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import {
  ApiSettingsRequestEntity,
  ApiSettingsResponse,
} from "@do-dydns/api-definition";
import { GetSettingsUseCase } from "../../domain/usecases/settings/GetSettingsUseCase/GetSettingsUseCase";
import { ExpressController } from "./ExpressController";
import { UpdateSettingsUseCase } from "../../domain/usecases/settings/UpdateSettingsUseCase/UpdateSettingsUseCase";
import { ResetSettingsUseCase } from "../../domain/usecases/settings/ResetSettingsUseCase/ResetSettingsUseCase";
import { SettingsEntity } from "../../domain/entities/SettingsEntity";
import { ResetDigitalOceanApiKeyUseCase } from "../../domain/usecases/settings/ResetDigitalOceanApiKeyUseCase/ResetDigitalOceanApiKeyUseCase";

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
      SettingsController.respondWithSettings(res, result.payload);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Reset the Digital Ocean api key. This removes all
   * user data from DO-DyDns.
   * @param _ the express request.
   * @param res the express response.
   */
  async resetApiKey(_: Request, res: Response): Promise<void> {
    const resetApiKeyUseCase = container.resolve(
      ResetDigitalOceanApiKeyUseCase
    );
    try {
      const result = await resetApiKeyUseCase.execute();
      if (result.success === false) {
        // TODO: handle error code
        this.jsonError(res, result.error);
        return;
      }

      SettingsController.respondWithSettings(res, result.payload);
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

      SettingsController.respondWithSettings(res, result.payload);
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
    const {
      apiKey,
      digitalOceanUpdateInterval,
      publicIPUpdateInterval,
    } = req.body as ApiSettingsRequestEntity;
    const updateSettingsUseCase = container.resolve(UpdateSettingsUseCase);
    try {
      updateSettingsUseCase.setRequestParam({
        settings: {
          id: 0,
          apiKey,
          digitalOceanUpdateInterval,
          publicIPUpdateInterval,
          created: 0,
          updated: 0,
        },
      });
      const result = await updateSettingsUseCase.execute();
      if (result.success === false) {
        this.jsonError(res, result.error);
        return;
      }

      SettingsController.respondWithSettings(res, result.payload);
    } catch (error) {
      this.jsonError(res, error);
    }
  }

  /**
   * Respond with the DO-DyDns settings.
   * @param res the express response.
   * @param settings the settings.
   * @private
   */
  private static respondWithSettings(
    res: Response,
    settings: SettingsEntity
  ): void {
    // TODO: validate API key in the entity-model mapper
    const response: ApiSettingsResponse = {
      success: true,
      settings: {
        id: settings.id,
        apiKeyValid: settings.apiKey.length > 0,
        digitalOceanUpdateInterval: settings.digitalOceanUpdateInterval,
        publicIPUpdateInterval: settings.publicIPUpdateInterval,
        created: settings.created,
        updated: settings.updated,
      },
    };
    res.status(200).json(response);
  }
}

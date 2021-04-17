import { SettingsRepository } from "../../../domain/datasource/repository/SettingsRepository";
import { Api } from "../Api";
import { injectable } from "tsyringe";
import { ApiSettingsResponse } from "@do-dydns/api-definition";
import { SettingsRequestEntity } from "../../../domain/entity/SettingsRequestEntity";
import { SettingsResponseEntity } from "../../../domain/entity/SettingsResponseEntity";

@injectable()
export class SettingsRepositoryImpl implements SettingsRepository {
  /**
   * Create a new SettingsRepositoryImpl instance.
   *
   * Talks with the DO-DyDns HTTP api to get/update the settings
   * @param api the http Api.
   */
  constructor(private readonly api: Api) {}

  /**
   * Get the settings.
   * @returns the settings.
   */
  getSettings(): Promise<SettingsResponseEntity> {
    return this.api.get<ApiSettingsResponse>("/settings").then((response) => {
      if (response.success === true) {
        return response.settings;
      }
      //  TODO: handle error code
      throw new Error(`Unable to get the settings: ${response.message}`);
    });
  }

  /**
   * Reset the Digital Ocean API key.
   */
  resetApiKey(): Promise<SettingsResponseEntity> {
    return this.api.delete<ApiSettingsResponse>("/settings/apikey")
      .then(response => {
        if (response.success === true) {
          return response.settings;
        }
        // TODO: handle error code
        throw new Error(`Unable to reset the Digital Ocean API key: ${response.message}`);
      })
  }

  /**
   * Reset the settings.
   * @returns the default settings.
   */
  resetSettings(): Promise<SettingsResponseEntity> {
    return this.api
      .post<ApiSettingsResponse>("/settings/reset", undefined)
      .then((response) => {
        if (response.success === true) {
          return response.settings;
        }
        // TODO: handle the error code
        throw new Error(`Unable to reset the settings: ${response.message}`);
      });
  }

  /**
   * Update the settings.
   * @param settings the settings.
   * @returns the updated settings.
   */
  updateSettings(
    settings: SettingsRequestEntity
  ): Promise<SettingsResponseEntity> {
    return this.api
      .put<ApiSettingsResponse>("/settings", settings)
      .then((response) => {
        if (response.success === true) {
          return response.settings;
        } else {
          throw new Error(`Unable to get the settings: ${response.message}`);
        }
      });
  }
}

import { SettingsRequestEntity } from "../../entity/SettingsRequestEntity";
import { SettingsResponseEntity } from "../../entity/SettingsResponseEntity";

export interface SettingsRepository {
  /**
   * Get the settings.
   * @returns the settings.
   */
  getSettings(): Promise<SettingsResponseEntity>;

  /**
   * Reset the Digital Ocean API key.
   */
  resetApiKey(): Promise<SettingsResponseEntity>;

  /**
   * Reset the settings.
   * @returns the default settings.
   */
  resetSettings(): Promise<SettingsResponseEntity>;

  /**
   * Update the settings.
   * @param settings the settings.
   * @returns the updated settings.
   */
  updateSettings(
    settings: SettingsRequestEntity
  ): Promise<SettingsResponseEntity>;
}

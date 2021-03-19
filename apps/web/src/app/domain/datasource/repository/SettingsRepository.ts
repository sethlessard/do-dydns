import { SettingsEntity } from "../../entity/SettingsEntity";

export interface SettingsRepository {
  /**
   * Get the settings.
   * @returns the settings.
   */
  getSettings(): Promise<SettingsEntity>;

  /**
   * Reset the settings.
   * @returns the default settings.
   */
  resetSettings(): Promise<SettingsEntity>;

  /**
   * Update the settings.
   * @param settings the settings.
   * @returns the updated settings.
   */
  updateSettings(settings: SettingsEntity): Promise<SettingsEntity>;
}

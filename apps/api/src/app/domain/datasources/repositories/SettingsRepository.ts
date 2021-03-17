import { SettingsEntity } from "../../entities/SettingsEntity";

export interface SettingsRepository {

  /**
   * Get the settings.
   * @returns the system settings.
   */
  getSettings(): Promise<SettingsEntity>;

  /**
   * Update the system settings.
   * @param settings the settings.
   * @returns the updated settings.
   */
  updateSettings(settings: SettingsEntity): Promise<SettingsEntity>;
}

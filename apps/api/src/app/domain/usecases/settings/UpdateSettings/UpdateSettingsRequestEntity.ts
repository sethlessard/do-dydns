import { SettingsEntity } from "../../../entities/SettingsEntity";

export interface UpdateSettingsRequestEntity {
  
  /**
   * The settings to update.
   */
  settings: SettingsEntity;
}

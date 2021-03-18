import { SettingsEntity } from "../../domain/entity/SettingsEntity";
import { View } from "./View";

export interface SettingsView extends View {

  /**
   * Show the settings.
   * @param settings the settings.
   */
  showSettings(settings: SettingsEntity): void;
}

import { View } from "./View";
import { SettingsResponseEntity } from "../../domain/entity/SettingsResponseEntity";

export interface SettingsView extends View {
  /**
   * Show the settings.
   * @param settings the settings.
   */
  showSettings(settings: SettingsResponseEntity): void;
}

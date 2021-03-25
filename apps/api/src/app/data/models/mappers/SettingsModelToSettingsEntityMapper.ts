import { SettingsEntity } from "../../../domain/entities/SettingsEntity";
import { SettingsModel } from "../SettingsModel";

export class SettingsModelToSettingsEntityMapper {
  /**
   * Create a new SettingsModelToSettingsEntityMapper.
   * @param settingsModel the data-layer settings model.
   */
  constructor(private readonly settingsModel: SettingsModel) {}

  map(): SettingsEntity {
    const {
      id,
      apiKey,
      digitalOceanUpdateInterval,
      publicIPUpdateInterval,
      created,
      updated,
    } = this.settingsModel;
    return {
      id,
      apiKey,
      digitalOceanUpdateInterval,
      publicIPUpdateInterval,
      created,
      updated,
    };
  }
}

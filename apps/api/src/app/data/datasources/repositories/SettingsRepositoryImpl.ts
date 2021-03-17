import { SettingsModelToSettingsEntityMapper } from "../../models/mappers/SettingsModelToSettingsEntityMapper";
import { SettingsModel } from "../../models/SettingsModel";
import { Connection, Repository } from "typeorm";
import { TypeormRepositoryFactory } from "./factory/TypeormRepositoryFactory";
import { SettingsRepository } from "../../../domain/datasources/repositories/SettingsRepository";
import { SettingsEntity } from "../../../domain/entities/SettingsEntity";

export class SettingsRepositoryImpl implements SettingsRepository {

  private readonly settingsRepository: Repository<SettingsModel>;

  /**
   * Create a new SettingsRepositoryImpl instance.
   * @param connection the Typeorm connection.
   */
  constructor(connection: Connection) {
    this.settingsRepository = connection.getRepository(SettingsModel);
  }

  /**
   * Get the settings.
   * @returns the system settings.
   */
  getSettings(): Promise<SettingsEntity> {
    return this.settingsRepository.findOne({ id: "0" })
      .then(settings => {
        if (!settings) {
          settings = {
            id: "0",
            apiKey: "",
            networkUpdateIntervalMinutes: 15,
            created: new Date(),
            updated: new Date()
          };
        }
        return new SettingsModelToSettingsEntityMapper(settings).map();
      });
  }

  /**
   * Update the system settings.
   * @param settings the settings.
   * @returns the updated settings.
   */
  updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    return this.settingsRepository.findOne({ id: "0" })
      .then(existingSettings => {
        if (!existingSettings) {
          settings.id = "0";
          return this.settingsRepository.insert(settings)
            .then(() => Promise.resolve());
        } else {
          return this.settingsRepository.update({ id: "0" }, settings)
            .then(() => Promise.resolve());
        }
      })
      .then(() => this.settingsRepository.findOne({ id: "0" }))
      .then(settings => {
        if (!settings) {
          throw new Error("Unable to update the settings.");
        }
        return new SettingsModelToSettingsEntityMapper(settings).map();
      });
  }
}

/**
 * Get a new SettingsRepositoryImpl instance.
 */
export function getSettingsRepositoryImpl(): SettingsRepositoryImpl {
  return new TypeormRepositoryFactory<SettingsRepositoryImpl>().create(SettingsRepositoryImpl);
}

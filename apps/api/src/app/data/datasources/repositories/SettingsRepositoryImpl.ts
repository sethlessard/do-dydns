import { SettingsModelToSettingsEntityMapper } from "../../models/mappers/SettingsModelToSettingsEntityMapper";
import { SettingsModel } from "../../models/SettingsModel";
import { Connection, Repository } from "typeorm";
import { TypeormRepositoryFactory } from "./factory/TypeormRepositoryFactory";
import { SettingsRepository } from "../../../domain/datasources/repositories/SettingsRepository";
import { SettingsEntity } from "../../../domain/entities/SettingsEntity";

export class SettingsRepositoryImpl implements SettingsRepository {
  private static DEFAULT_SETTINGS(): SettingsModel {
    const now = Date.now();
    return {
      id: "0",
      apiKey: "",
      networkUpdateIntervalMinutes: 15,
      created: now,
      updated: now,
    };
  }

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
    return this.settingsRepository.findOne({ id: "0" }).then((settings) => {
      if (!settings) {
        settings = SettingsRepositoryImpl.DEFAULT_SETTINGS();
        return this.settingsRepository
          .insert(settings)
          .then(() => new SettingsModelToSettingsEntityMapper(settings).map());
      }
      return new SettingsModelToSettingsEntityMapper(settings).map();
    });
  }

  /**
   * Reset the settings.
   * @returns the default DO-DyDns settings.
   */
  resetSettings(): Promise<SettingsEntity> {
    return this.settingsRepository.clear().then(() => this.getSettings());
  }

  /**
   * Update the system settings.
   * @param settings the settings.
   * @returns the updated settings.
   */
  updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    return this.settingsRepository
      .findOne({ id: "0" })
      .then((existingSettings) => {
        if (!existingSettings) {
          settings.id = "0";
          return this.settingsRepository
            .insert(settings)
            .then(() => Promise.resolve());
        } else {
          return this.settingsRepository
            .update({ id: "0" }, settings)
            .then(() => Promise.resolve());
        }
      })
      .then(() => this.settingsRepository.findOne({ id: "0" }))
      .then((settings) => {
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
  return new TypeormRepositoryFactory<SettingsRepositoryImpl>().create(
    SettingsRepositoryImpl
  );
}

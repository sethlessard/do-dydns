import { UseCase } from "../UseCase";
import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../datasource/repository/SettingsRepository";
import { SettingsResponseEntity } from "../../entity/SettingsResponseEntity";

@injectable()
export class ResetSettings extends UseCase<void, SettingsResponseEntity> {
  /**
   * Create a new ResetSettings instance.
   * @param settingsRepository the settings repository.
   */
  constructor(
    @inject("SettingsRepository")
    private readonly settingsRepository: SettingsRepository
  ) {
    super();
  }

  /**
   * Reset the DO-DyDns settings back to their defaults.
   *
   * This also removes the Digital Ocean API key.
   * @protected
   */
  protected useCaseLogic(): Promise<SettingsResponseEntity> {
    return this.settingsRepository.resetSettings();
  }
}

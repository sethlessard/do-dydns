import { UseCase } from "../UseCase";
import { SettingsEntity } from "../../entity/SettingsEntity";
import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../datasource/repository/SettingsRepository";

@injectable()
export class ResetSettingsUseCase extends UseCase<void, SettingsEntity> {
  /**
   * Create a new ResetSettingsUseCase instance.
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
  protected useCaseLogic(): Promise<SettingsEntity> {
    return this.settingsRepository.resetSettings();
  }
}

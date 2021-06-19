import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../datasource/repository/SettingsRepository";
import { SettingsRequestEntity } from "../../entity/SettingsRequestEntity";
import { UseCase } from "../UseCase";
import { SettingsResponseEntity } from "../../entity/SettingsResponseEntity";

@injectable()
export class GetSettings extends UseCase<void, SettingsResponseEntity> {
  /**
   * Create a new GetSettings instance.
   * @param settingsRepository the settings repository.
   */
  constructor(
    @inject("SettingsRepository")
    private readonly settingsRepository: SettingsRepository
  ) {
    super();

    // bind
    this.useCaseLogic = this.useCaseLogic.bind(this);
  }

  /**
   * Get the settings.
   * @returns the settings.
   */
  protected useCaseLogic(): Promise<SettingsResponseEntity> {
    return this.settingsRepository.getSettings();
  }
}

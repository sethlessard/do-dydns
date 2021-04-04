import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../datasource/repository/SettingsRepository";
import { SettingsEntity } from "../../entity/SettingsEntity";
import { UseCase } from "../UseCase";

@injectable()
export class GetSettingsUseCase extends UseCase<void, SettingsEntity> {
  /**
   * Create a new GetSettingsUseCase instance.
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
  protected useCaseLogic(): Promise<SettingsEntity> {
    return this.settingsRepository.getSettings();
  }
}

import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../datasource/repository/SettingsRepository";
import { SettingsEntity } from "../../entity/SettingsEntity";
import { UseCase } from "../UseCase";

@injectable()
export class UpdateSettingsUseCase extends UseCase<
  SettingsEntity,
  SettingsEntity
> {
  /**
   * Create a new UpdateSettingsUseCase
   * @param settingsRepository the settings repository.
   */
  constructor(
    @inject("SettingsRepository")
    private readonly settingsRepository: SettingsRepository
  ) {
    super();
  }

  /**
   * Update the settings.
   */
  protected useCaseLogic(): Promise<SettingsEntity> {
    if (!this.request) {
      throw new Error("You forgot to call setRequestParams()!");
    }
    return this.settingsRepository.updateSettings(this.request);
  }
}

import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../datasource/repository/SettingsRepository";
import { SettingsRequestEntity } from "../../entity/SettingsRequestEntity";
import { UseCase } from "../UseCase";
import { SettingsResponseEntity } from "../../entity/SettingsResponseEntity";

@injectable()
export class UpdateSettings extends UseCase<
  SettingsRequestEntity,
  SettingsResponseEntity
> {
  /**
   * Create a new UpdateSettings
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
  protected useCaseLogic(): Promise<SettingsResponseEntity> {
    if (!this.request) {
      throw new Error("You forgot to call setRequestParams()!");
    }
    return this.settingsRepository.updateSettings(this.request);
  }
}

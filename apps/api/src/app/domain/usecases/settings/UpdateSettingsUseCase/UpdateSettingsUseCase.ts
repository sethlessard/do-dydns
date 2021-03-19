import { DOService } from "../../../datasources/services/DOService";
import { SettingsRepository } from "../../../datasources/repositories/SettingsRepository";
import { UseCase } from "../../UseCase";
import { UpdateSettingsRequestEntity } from "./UpdateSettingsRequestEntity";
import { UpdateSettingsResponseEntity } from "./UpdateSettingsResponseEntity";
import { inject, injectable } from "tsyringe";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
@injectable()
export class UpdateSettingsUseCase extends UseCase<
  UpdateSettingsRequestEntity,
  UpdateSettingsResponseEntity
> {
  /**
   * UpdateSettingsUseCase constructor.
   * @param settingsRepository the settings repository.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("SettingsRepository")
    private readonly settingsRepository: SettingsRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Update the DO-DyDns settings.
   */
  protected useCaseLogic(): Promise<
    UpdateSettingsResponseEntity | ErrorResponseEntity
  > {
    const { settings } = this._param;
    return this.settingsRepository
      .getSettings()
      .then((storedSettings) => {
        if (storedSettings.apiKey != settings.apiKey) {
          return this.doService.updateApiKey(settings.apiKey);
        }
        return Promise.resolve();
      })
      .then(() => this.settingsRepository.updateSettings(settings))
      .then((updatedSettings) => ({ success: true, payload: updatedSettings }))
      .catch((error) => ({ success: false, error }));
  }
}

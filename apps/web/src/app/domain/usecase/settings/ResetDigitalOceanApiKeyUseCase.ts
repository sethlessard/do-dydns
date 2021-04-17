import { UseCase } from "../UseCase";
import { SettingsResponseEntity } from "../../entity/SettingsResponseEntity";
import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../datasource/repository/SettingsRepository";

@injectable()
export class ResetDigitalOceanApiKeyUseCase extends UseCase<void, SettingsResponseEntity> {

  /**
   * Create a new ResetDigitalOceanApiKeyUseCase instance.
   * @param settingsRepository the settings repository.
   */
  constructor(
    @inject("SettingsRepository") private readonly settingsRepository: SettingsRepository
  ) {
    super();
  }

  /**
   * Reset the Digital Ocean API key.
   * @protected
   */
  protected useCaseLogic(): Promise<SettingsResponseEntity> {
    // TODO: i might want to clear the local domain & subdomain repositories here
    return this.settingsRepository.resetApiKey();
  }
}

import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { SettingsRepository } from "../../../datasources/repositories/SettingsRepository";
import { UseCase } from "../../UseCase";
import { GetSettingsResponseEntity } from "./GetSettingsResponseEntity";
import { injectable } from "tsyringe";

// TODO: test
@injectable()
export class GetSettingsUseCase extends UseCase<undefined, GetSettingsResponseEntity> {

  /**
   * GetSettingsUseCase constructor.
   * @param settingsRepository the settings repository.
   */
  constructor(private readonly settingsRepository: SettingsRepository) {
    super();
  }

  /**
   * Get the DO-DyDns settings.
   */
  protected useCaseLogic(): Promise<GetSettingsResponseEntity  | ErrorResponseEntity> {
    return this.settingsRepository.getSettings()
      .then(settings => ({ success: true, payload: settings }))
      .catch(error => ({ success: false, error }));
  }
}

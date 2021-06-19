import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { SettingsRepository } from "../../../datasources/repositories/SettingsRepository";
import { UseCase } from "../../UseCase";
import { GetSettingsResponseEntity } from "./GetSettingsResponseEntity";
import { inject, injectable } from "tsyringe";

// TODO: test
@injectable()
export class GetSettings extends UseCase<undefined, GetSettingsResponseEntity> {
  /**
   * GetSettings constructor.
   * @param settingsRepository the settings repository.
   */
  constructor(
    @inject("SettingsRepository")
    private readonly settingsRepository: SettingsRepository
  ) {
    super();
  }

  /**
   * Get the DO-DyDns settings.
   */
  protected useCaseLogic(): Promise<
    GetSettingsResponseEntity | ErrorResponseEntity
  > {
    return this.settingsRepository
      .getSettings()
      .then((settings) => ({ success: true, payload: settings }))
      .catch((error) => ({ success: false, error }));
  }
}

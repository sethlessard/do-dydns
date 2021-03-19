import { UseCase } from "../../UseCase";
import { ResetSettingsResponseEntity } from "./ResetSettingsResponseEntity";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../../datasources/repositories/SettingsRepository";
import { ErrorCode } from "@do-dydns/api-definition";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";

@injectable()
export class ResetSettingsUseCase extends UseCase<
  void,
  ResetSettingsResponseEntity
> {
  /**
   * Create a new ResetSettingsUseCase instance.
   * @param settingsRepository the settings repository,
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   */
  constructor(
    @inject("SettingsRepository")
    private readonly settingsRepository: SettingsRepository,
    @inject("DomainRepository")
    private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository
  ) {
    super();

    // bind
    this.useCaseLogic = this.useCaseLogic.bind(this);
  }

  /**
   * Reset the DO-DyDns settings.
   * @protected
   */
  protected useCaseLogic(): Promise<
    ErrorResponseEntity | ResetSettingsResponseEntity
  > {
    return this.settingsRepository
      .resetSettings()
      .then((settings) => {
        return Promise.all([
          this.domainRepository.clearDomainEntries(),
          this.subdomainRepository.clearSubdomainEntries(),
        ]).then(() => ({ success: true, payload: settings }));
      })
      .catch((error) => ({
        success: false,
        error,
        errorCode: ErrorCode.General,
      }));
  }
}

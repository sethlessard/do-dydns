import { UseCase } from "../../UseCase";
import { ResetDigitalOceanApiResponseEntity } from "./ResetDigitalOceanApiResponseEntity";
import { inject, injectable } from "tsyringe";
import { SettingsRepository } from "../../../datasources/repositories/SettingsRepository";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { ErrorCode } from "@do-dydns/api-definition";

@injectable()
export class ResetDigitalOceanApiKeyUseCase extends UseCase<void, ResetDigitalOceanApiResponseEntity> {

  /**
   * Create a new ResetDigitalOceanApiKeyUseCase instance.
   * @param settingsRepository the settings repository.
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   */
  constructor(
    @inject("SettingsRepository") private readonly settingsRepository: SettingsRepository,
    @inject("DomainRepository") private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository") private readonly subdomainRepository: SubdomainRepository
  ) {
    super();
  }

  /**
   * Reset the Digital Ocean API key and remove all Digital Ocean related data
   * from DO-DyDns.
   * @protected
   */
  protected useCaseLogic(): Promise<ErrorResponseEntity | ResetDigitalOceanApiResponseEntity> {
    return this.settingsRepository.resetApiKey()
      .then(settings => Promise.all([
        this.domainRepository.clearDomainEntries(),
        this.subdomainRepository.clearSubdomainEntries()
      ]).then(() => settings))
      .then(settings => ({ success: true, payload: settings }))
      .catch(error => ({ success: false, error, errorCode: ErrorCode.General }));
  }
}

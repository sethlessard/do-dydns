import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { DOService } from "../../../datasources/services/DOService";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { UseCase } from "../../UseCase";
import { DeleteDomainRequestEntity } from "./DeleteDomainRequestEntity";
import { DeleteDomainResponseEntity } from "./DeleteDomainResponseEntity";
import { inject } from "tsyringe";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

export class DeleteDomainUseCase extends UseCase<DeleteDomainRequestEntity, DeleteDomainResponseEntity> {

  /**
   * DeleteDomainUseCase constructor.
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("DomainRepository") private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository") private readonly subdomainRepository: SubdomainRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Delete a domain from DigitalOcean and DO-DyDns.
   */
  protected useCaseLogic(): Promise<DeleteDomainResponseEntity | ErrorResponseEntity> {
    const { domain } = this._param;
    return Promise.all([
      this.doService.deleteDomain(domain.name),
      this.domainRepository.deleteDomain(domain.id),
      this.subdomainRepository.deleteAllSubdomainsForDomain(domain.id)
    ])
      .then(([, deletedDomain]) => ({ success: true, payload: deletedDomain }))
      .catch(error => ({ success: false, error }));
  }
}

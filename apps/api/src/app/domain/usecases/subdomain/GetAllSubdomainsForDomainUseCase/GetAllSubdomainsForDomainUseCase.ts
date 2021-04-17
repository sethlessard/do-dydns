import { inject, injectable } from "tsyringe";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { UseCase } from "../../UseCase";
import { GetAllSubdomainsForDomainRequestEntity } from "./GetAllSubdomainsForDomainRequestEntity";
import { GetAllSubdomainsForDomainResponseEntity } from "./GetAllSubdomainsForDomainResponseEntity";

// TODO: test
@injectable()
export class GetAllSubdomainsForDomainUseCase extends UseCase<
  GetAllSubdomainsForDomainRequestEntity,
  GetAllSubdomainsForDomainResponseEntity
> {
  /**
   * GetAllSubdomainsForDomainUseCase constructor.
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   */
  constructor(
    @inject("DomainRepository")
    private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository
  ) {
    super();

    this.useCaseLogic = this.useCaseLogic.bind(this);
  }

  /**
   * Get all subdomains for a domain.
   */
  protected useCaseLogic(): Promise<
    GetAllSubdomainsForDomainResponseEntity | ErrorResponseEntity
  > {
    const { domain } = this._param;
    // verify that this domain exists
    return (
      this.domainRepository
        .getDomainByName(domain)
        .then((domain) => domain !== undefined && domain !== null)
        .then((domainExists) => {
          if (!domainExists) {
            throw new Error(`The domain '${domain}' not found.`);
          }
        })
        // get the subdomains for the domain
        .then(() => this.subdomainRepository.getSubdomainsForDomain(domain))
        .then((subdomains) => ({ success: true, payload: subdomains }))
        .catch((error) => ({ success: false, error }))
    );
  }
}

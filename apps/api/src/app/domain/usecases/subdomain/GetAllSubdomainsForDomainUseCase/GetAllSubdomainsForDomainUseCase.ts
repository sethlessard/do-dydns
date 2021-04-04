import * as _ from "lodash";
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
  }

  /**
   * Get all subdomains for a domain.
   */
  protected useCaseLogic(): Promise<
    GetAllSubdomainsForDomainResponseEntity | ErrorResponseEntity
  > {
    const { domainID } = this._param;
    // verify that this domain exists
    return (
      this.domainRepository
        .getDomains()
        .then((domains) => _.find(domains, { id: domainID }) !== undefined)
        .then((domainExists) => {
          if (!domainExists) {
            throw new Error(`The domain with id '${domainID}' not found.`);
          }
        })
        // get the subdomains for the domain
        .then(() => this.subdomainRepository.getSubdomainsForDomain(domainID))
        .then((subdomains) => ({ success: true, payload: subdomains }))
        .catch((error) => ({ success: false, error }))
    );
  }
}

import { inject, injectable } from "tsyringe";
import { DOService } from "../../../datasources/services/DOService";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { IPRepository } from "../../../datasources/repositories/IPRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { DODomainRecordEntityToSubdomainEntityMapper } from "../../../entities/mapper/DODomainRecordEntityToSubdomainEntityMapper";
import { UseCase } from "../../UseCase";
import { UpdateDomainRequestEntity } from "./UpdateDomainRequestEntity";
import { UpdateDomainResponseEntity } from "./UpdateDomainResponseEntity";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
@injectable()
export class UpdateDomainUseCase extends UseCase<
  UpdateDomainRequestEntity,
  UpdateDomainResponseEntity
> {
  /**
   * UpdateDomainUseCase constructor.
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   * @param ipRepository the ip repository.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("DomainRepository")
    private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Update a domain, possibly with DigitalOcean if active is set.
   */
  protected useCaseLogic(): Promise<
    UpdateDomainResponseEntity | ErrorResponseEntity
  > {
    const { domain: domainToUpdate } = this._param;
    // get the currently stored domain
    return (
      this.domainRepository
        .getDomainByID(domainToUpdate.id)
        .then((storedDomain) => {
          if (!storedDomain) {
            throw new Error(`Domain with id '${domainToUpdate.id}' not found!`);
          }
          if (
            domainToUpdate.active &&
            domainToUpdate.active !== storedDomain.active
          ) {
            // the domain was set to active
            // update the @ A name of the domain to the public ip
            return (
              this.ipRepository
                .getIP()
                .then((ip) =>
                  this.doService.updateIPOfDomainsAndSubdomains(
                    { [domainToUpdate.name]: ["@"] },
                    ip
                  )
                )
                // map the digital ocean domain records to SubdomainEntities
                .then((doDomainRecordEntities) =>
                  doDomainRecordEntities.map((d) =>
                    new DODomainRecordEntityToSubdomainEntityMapper(d).map()
                  )
                )
            );
            // TODO: merge the mapped SubdomainEntities with the existing SubdomainEntities in the repository
          } else if (
            !domainToUpdate.active &&
            domainToUpdate.active !== storedDomain.active
          ) {
            // the domain was set to inactive
            // set the subdomains to inactive
            return this.subdomainRepository
              .getSubdomainsForDomain(domainToUpdate.name)
              .then((subdomains) =>
                Promise.all(
                  subdomains.map((s) => {
                    s.active = false;
                    return this.subdomainRepository.insertOrUpdateSubdomain(s);
                  })
                )
              );
          }
          return Promise.resolve([]);
        })
        // update the domain
        .then(() => this.domainRepository.insertOrUpdateDomain(domainToUpdate))
        .then((updatedDomain) => ({ success: true, payload: updatedDomain }))
        .catch((error) => ({ success: false, error }))
    );
  }
}

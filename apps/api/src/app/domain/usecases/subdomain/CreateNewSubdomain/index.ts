import { DOService } from "../../../datasources/services/DOService";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { IPRepository } from "../../../datasources/repositories/IPRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { DODomainRecordEntityToSubdomainEntityMapper } from "../../../entities/mapper/DODomainRecordEntityToSubdomainEntityMapper";
import { UseCase } from "../../UseCase";
import { CreateNewSubdomainRequestEntity } from "./CreateNewSubdomainRequestEntity";
import { CreateNewSubdomainResponseEntity } from "./CreateNewSubdomainResponseEntity";
import { inject, injectable } from "tsyringe";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
@injectable()
export class CreateNewSubdomain extends UseCase<
  CreateNewSubdomainRequestEntity,
  CreateNewSubdomainResponseEntity
> {
  /**
   * CreateNewSubdomain constructor.
   * @param subdomainRepository the subdomain repository.
   * @param domainRepository the domain repository.
   * @param ipRepository the ip repository.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository,
    @inject("DomainRepository")
    private readonly domainRepository: DomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Create a new subdomain.
   */
  protected useCaseLogic(): Promise<
    CreateNewSubdomainResponseEntity | ErrorResponseEntity
  > {
    const { domain, name } = this._param;
    // get the current public-facing IP Address and domain
    return (
      Promise.all([
        this.ipRepository.getIP(),
        this.domainRepository.getDomainByName(domain),
      ])
        // verify the domain exists and create the subdomain in digitalocean
        .then(([ip, domain]) => {
          if (!domain) {
            throw new Error(`Domain with name '${domain}' not found.`);
          }

          return this.doService.createSubdomain(name, domain.name, ip);
        })
        // map the DigitalOcean Domain Record entity to a SubdomainEntity
        .then((doDomainRecordEntity) =>
          new DODomainRecordEntityToSubdomainEntityMapper(
            doDomainRecordEntity
          ).map()
        )
        // save the subdomain in the repository
        .then((subdomainEntity) =>
          this.subdomainRepository.insertOrUpdateSubdomain(subdomainEntity)
        )
        // return
        .then((subdomainEntity) => ({
          success: true,
          payload: subdomainEntity,
        }))
        .catch((error) => ({ success: false, error }))
    );
  }
}

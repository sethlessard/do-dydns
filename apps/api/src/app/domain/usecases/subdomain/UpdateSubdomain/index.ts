import { DOService } from "../../../datasources/services/DOService";
import { IPRepository } from "../../../datasources/repositories/IPRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { UseCase } from "../../UseCase";
import { UpdateSubdomainRequestEntity } from "./UpdateSubdomainRequestEntity";
import { UpdateSubdomainResponseEntity } from "./UpdateSubdomainResponseEntity";
import { inject, injectable } from "tsyringe";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
@injectable()
export class UpdateSubdomain extends UseCase<
  UpdateSubdomainRequestEntity,
  UpdateSubdomainResponseEntity
> {
  /**
   * UpdateSubdomain constructor.
   * @param subdomainRepository the subdomain repository.
   * @param ipRepository the ip repository.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Update a subdomain.
   */
  protected useCaseLogic(): Promise<
    UpdateSubdomainResponseEntity | ErrorResponseEntity
  > {
    const { subdomain: subdomainToUpdate } = this._param;
    // get the stored subdomain
    return this.subdomainRepository
      .getSubdomainByID(subdomainToUpdate.domainID, subdomainToUpdate.id)
      .then((storedSubdomain) => {
        if (!storedSubdomain) {
          throw new Error(`Subdomain with id of '${subdomainToUpdate.id}'`);
        }
        if (
          storedSubdomain.active !== subdomainToUpdate.active &&
          subdomainToUpdate.active
        ) {
          // update the IP of the subdomain with Digital Ocean
          return this.ipRepository
            .getIP()
            .then((ip) =>
              this.doService.updateIPOfDomainsAndSubdomains(
                { [storedSubdomain.domain]: [storedSubdomain.name] },
                ip
              )
            );
        }
        return Promise.resolve([]);
      })
      .then(() =>
        this.subdomainRepository.insertOrUpdateSubdomain(subdomainToUpdate)
      )
      .then((updatedSubdomain) => ({
        success: true,
        payload: updatedSubdomain,
      }))
      .catch((error) => ({ success: false, error }));
  }
}

import { DOService } from "../../../datasources/services/DOService";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { UseCase } from "../../UseCase";
import { DeleteSubdomainRequestEntity } from "./DeleteSubdomainRequestEntity";
import { DeleteSubdomainResponseEntity } from "./DeleteSubdomainResponseEntity";
import { inject, injectable } from "tsyringe";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
@injectable()
export class DeleteSubdomain extends UseCase<
  DeleteSubdomainRequestEntity,
  DeleteSubdomainResponseEntity
> {
  /**
   * DeleteSubdomain constructor.
   * @param subdomainRepository the subdomain repository.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Delete a subdomain from digital ocean.
   */
  protected useCaseLogic(): Promise<
    DeleteSubdomainResponseEntity | ErrorResponseEntity
  > {
    const { subdomain } = this._param;
    return this.subdomainRepository
      .getSubdomainByID(subdomain.domainID, subdomain.id)
      .then((storedSubdomain) => {
        if (!storedSubdomain) {
          throw new Error(
            `A subdomain with id of '${subdomain.id}' not found!`
          );
        }
      })
      .then(() =>
        this.doService.deleteSubdomain(subdomain.name, subdomain.domain)
      )
      .then(() =>
        this.subdomainRepository.deleteSubdomain(
          subdomain.domainID,
          subdomain.id
        )
      )
      .then((deletedSubdomain) => ({
        success: true,
        payload: deletedSubdomain,
      }))
      .catch((error) => ({ success: false, error }));
  }
}

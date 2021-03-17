import { inject } from "tsyringe";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { GetAllDomainsResponseEntity } from "./GetAllDomainsResponseEntity";
import { UseCase } from "../../UseCase";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
export class GetAllDomainsUseCase extends UseCase<undefined, GetAllDomainsResponseEntity> {
  
  /**
   * GetAllDomainsUseCase constructor.
   * @param domainRepository the domain repository.
   */
  constructor(@inject("DomainRepository") private readonly domainRepository: DomainRepository) {
    super();
  }

  /**
   * Execute the use case. Get all domains.
   */
  protected useCaseLogic(): Promise<GetAllDomainsResponseEntity | ErrorResponseEntity> {
    return this.domainRepository.getDomains()
      .then(domains => ({ success: true, payload: domains }))
      .catch(error => ({ success: false, error }));
  }

}
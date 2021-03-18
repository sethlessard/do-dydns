import { inject, injectable } from "tsyringe";
import { DomainRepository } from "../../datasource/repository/DomainRepository";
import { DomainEntity } from "../../entity/DomainEntity";
import { UseCase } from "../UseCase";

@injectable()
export class GetAllDomainsUseCase extends UseCase<void, DomainEntity[]> {

  /**
   * Create a new GetAllDomainsUseCase instance.
   * @param domainRepository the domain repository.
   */
  constructor(@inject("DomainRepository") private readonly domainRepository: DomainRepository) {
    super();

    // bind
    this.usecaseLogic = this.usecaseLogic.bind(this);
  }

  /**
   * Get all of the domains.
   */
  protected usecaseLogic(): Promise<DomainEntity[]> {
    return this.domainRepository.getAllDomains();
  }
}

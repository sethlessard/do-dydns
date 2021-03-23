import { UseCase } from "../UseCase";
import { SubdomainEntity } from "../../entity/SubdomainEntity";
import { inject, injectable } from "tsyringe";
import { SubdomainRepository } from "../../datasource/repository/SubdomainRepository";

@injectable()
export class GetAllSubdomainsForDomainUseCase extends UseCase<
  string,
  SubdomainEntity[]
> {
  /**
   * Create a new GetAllSubdomainsForDomainUseCase
   * @param subdomainRepository the subdomain repository.
   */
  constructor(
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository
  ) {
    super();
  }

  /**
   * Get all subdomains for a given domain.
   * @protected
   */
  protected usecaseLogic(): Promise<SubdomainEntity[]> {
    const domain = this.request;
    if (!domain) {
      throw new Error("You forgot to call setRequest()!");
    }
    return this.subdomainRepository.getSubdomainsForDomain(domain);
  }
}

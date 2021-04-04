import { ApiSubdomainArrayResponse } from "@do-dydns/api-definition";
import { SubdomainRepository } from "../../../domain/datasource/repository/SubdomainRepository";
import { Api } from "../Api";
import { SubdomainEntity } from "../../../domain/entity/SubdomainEntity";
import { injectable } from "tsyringe";

@injectable()
export class SubdomainRepositoryImpl implements SubdomainRepository {
  /**
   * Create a new SubdomainRepositoryImpl instance,
   * @param api the DO-DyDns api
   */
  constructor(private readonly api: Api) {}

  /**
   * Get all the subdomains for a specified domain.
   * @param domain the name of the domain.
   */
  getSubdomainsForDomain(domain: string): Promise<SubdomainEntity[]> {
    return this.api
      .get<ApiSubdomainArrayResponse>(`/domain/${domain}/subdomains`)
      .then((response) => {
        if (response.success === true) {
          return response.subdomains;
        } else {
          throw new Error(`Unable to get the domains: ${response.message}`);
        }
      });
  }
}

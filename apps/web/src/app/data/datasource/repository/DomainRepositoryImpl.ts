import { Api } from "../Api";
import { injectable } from "tsyringe";
import { DomainRepository } from "../../../domain/datasource/repository/DomainRepository";
import { ApiDomainArrayResponse } from "@do-dydns/api-definition";
import { DomainEntity } from "../../../domain/entity/DomainEntity";

// TODO: test
@injectable()
export class DomainRepositoryImpl implements DomainRepository {
  /**
   * Create a new DomainRepositoryImpl instance.
   *
   * Talks with the DO-DyDns HTTP api to get the current public-facing IP address.
   * @param api the http Api.
   */
  constructor(private readonly api: Api) {}

  /**
   * Get all domains.
   * @returns the domains.
   */
  getAllDomains(): Promise<DomainEntity[]> {
    return this.api.get<ApiDomainArrayResponse>("/domain").then((response) => {
      if (response.success === true) {
        return response.domains;
      } else {
        // TODO: handle error code
        throw new Error(`Unable to get the domains: ${response.message}`);
      }
    });
  }
}

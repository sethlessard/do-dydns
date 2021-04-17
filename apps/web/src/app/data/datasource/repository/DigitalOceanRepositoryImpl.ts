import { DigitalOceanRepository } from "../../../domain/datasource/repository/DigitalOceanRepository";
import { Api } from "../Api";
import { ApiSuccessResponse } from "@do-dydns/api-definition";
import { injectable } from "tsyringe";

@injectable()
export class DigitalOceanRepositoryImpl implements DigitalOceanRepository {
  /**
   * Create a new DigitalOceanRepositoryImpl instance.
   *
   * @param api the DO-DyDns Api.
   */
  constructor(private readonly api: Api) {}

  /**
   * Sync with Digital Ocean.
   */
  syncWithDigitalOcean(): Promise<void> {
    return this.api
      .post<ApiSuccessResponse>("/digitalocean/sync", undefined)
      .then(() => Promise.resolve());
  }
}

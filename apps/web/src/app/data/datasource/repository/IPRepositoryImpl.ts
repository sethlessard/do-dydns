import { IPRepository } from "../../../domain/datasource/repository/IPRepository";
import { Api } from "../Api";
import {ApiGetCurrentIPResponse} from "@do-dydns/api-definition";
import {injectable} from "tsyringe";

// TODO: test
@injectable()
export class IPRepositoryImpl implements IPRepository {

  /**
   * Create a new IPRepositoryImpl instance.
   *
   * Talks with the DO-DyDns HTTP api to get the current public-facing IP address.
   * @param api the http Api.
   */
  constructor(private readonly api: Api) { }

  /**
   * Get the current IP address.
   * @returns the IP address.
   */
  getCurrentIPAddress(): Promise<string> {
    return this.api.get<ApiGetCurrentIPResponse>("/ip")
      .then(response => {
        if (response.success === true) {
          return response.ipAddress;
        } else {
          // TODO: handle error code
          throw new Error(`Unable to get the current public-facing IP address: ${response.message}`);
        }
      });
  }
}

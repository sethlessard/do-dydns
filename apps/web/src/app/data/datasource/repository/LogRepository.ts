import { LogRepository } from "../../../domain/datasource/repository/LogRepository";
import { LogEntity } from "../../../domain/entity/LogEntity";
import { injectable } from "tsyringe";
import { Api } from "../Api";
import { ApiLogResponse } from "@do-dydns/api-definition";

@injectable()
export class LogRepositoryImpl implements LogRepository {
  /**
   * Create a new LogRepositoryImpl instance.
   * @param api the api.
   */
  constructor(private readonly api: Api) {}

  /**
   * Delete the DO-DyDns logs.
   * @returns the logs (empty).
   */
  deleteLogs(): Promise<LogEntity[]> {
    return this.api.delete<ApiLogResponse>("/log").then((response) => {
      if (response.success === true) {
        return response.logs;
      }
      // TODO: handle error code
      throw new Error(`Unable to delete the logs: ${response.message}`);
    });
  }

  /**
   * Get the DO-DyDns logs.
   * @returns the logs.
   */
  getLogs(): Promise<LogEntity[]> {
    return this.api.get<ApiLogResponse>("/log").then((response) => {
      if (response.success === true) {
        return response.logs;
      }
      // TODO: handle error code
      throw new Error(`Unable to get the logs: ${response.message}`);
    });
  }
}

import { LogEntity } from "../../entity/LogEntity";

export interface LogRepository {
  /**
   * Delete the DO-DyDns logs.
   * @returns the logs (empty).
   */
  deleteLogs(): Promise<LogEntity[]>;

  /**
   * Get the DO-DyDns logs.
   * @returns the logs.
   */
  getLogs(): Promise<LogEntity[]>;
}

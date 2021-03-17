import { LogEntity } from "../../entities/LogEntity";

export interface LogRepository {

  /**
   * Delete logs from the repository.
   */
  deleteLogs(): Promise<void>;

  /**
   * Get the logs.
   * @returns the logs.
   */
  getLogs(): Promise<LogEntity[]>;

  /**
   * Inset a log into the repository.
   * @param log the log.
   */
  insertLog(log: Partial<LogEntity>): Promise<void>;
}

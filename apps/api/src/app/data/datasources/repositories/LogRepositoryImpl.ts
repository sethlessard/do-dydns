import { Connection, Repository } from "typeorm";
import { TypeormRepositoryFactory } from "./factory/TypeormRepositoryFactory";
import { LogModel } from "../../models/LogModel";
import { LogModelToLogEntityMapper } from "../../models/mappers/LogModelToLogEntityMapper";
import { LogRepository } from "../../../domain/datasources/repositories/LogRepository";
import { LogEntity } from "../../../domain/entities/LogEntity";

// TODO: test
export class LogRepositoryImpl implements LogRepository {

  private readonly logRepository: Repository<LogModel>;

  /**
   * Create a new LogRepositoryImpl instance.
   * @param connection the Typeorm connection.
   */
  constructor(connection: Connection) {
    this.logRepository = connection.getRepository(LogModel);
  }

  /**
   * Delete logs from the repository.
   * @returns the logs that were deleted.
   */
  deleteLogs(): Promise<void> {
    return this.logRepository.clear();
  }

  /**
   * Get the logs.
   * @returns the logs.
   */
  getLogs(): Promise<LogEntity[]> {
    return this.logRepository.find()
      .then(logs => logs.map(log => new LogModelToLogEntityMapper(log).map()));
  }

  /**
   * Inset a log into the repository.
   * @param log the log.
   * @returns the inserted log.
   */
  insertLog(log: Partial<LogEntity>): Promise<void> {
    const logModel = new LogModel();
    Object.assign(logModel, log);
    return this.logRepository.insert(logModel)
      .then(() => Promise.resolve());
  }
}

/**
 * Get a new LogRepositoryImpl instance
 */
export function getLogRepositoryImpl(): LogRepositoryImpl {
  return new TypeormRepositoryFactory<LogRepositoryImpl>().create(LogRepositoryImpl);
}

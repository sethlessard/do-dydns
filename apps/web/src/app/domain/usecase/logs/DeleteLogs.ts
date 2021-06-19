import { UseCase } from "../UseCase";
import { LogEntity } from "../../entity/LogEntity";
import { inject, injectable } from "tsyringe";
import { LogRepository } from "../../datasource/repository/LogRepository";

@injectable()
export class DeleteLogs extends UseCase<void, LogEntity[]> {
  /**
   * Create a new DeleteLogs instance.
   * @param logRepository the log repository.
   */
  constructor(
    @inject("LogRepository") private readonly logRepository: LogRepository
  ) {
    super();
  }

  /**
   * Delete the DO-DyDns logs.
   * @protected
   */
  protected useCaseLogic(): Promise<LogEntity[]> {
    return this.logRepository.deleteLogs();
  }
}

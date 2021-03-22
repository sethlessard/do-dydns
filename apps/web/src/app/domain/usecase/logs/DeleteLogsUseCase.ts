import { UseCase } from "../UseCase";
import { LogEntity } from "../../entity/LogEntity";
import { inject, injectable } from "tsyringe";
import { LogRepository } from "../../datasource/repository/LogRepository";

@injectable()
export class DeleteLogsUseCase extends UseCase<void, LogEntity[]> {
  /**
   * Create a new DeleteLogsUseCase instance.
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
  protected usecaseLogic(): Promise<LogEntity[]> {
    return this.logRepository.deleteLogs();
  }
}

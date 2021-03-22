import { UseCase } from "../UseCase";
import { LogEntity } from "../../entity/LogEntity";
import { inject, injectable } from "tsyringe";
import { LogRepository } from "../../datasource/repository/LogRepository";

@injectable()
export class GetLogsUseCase extends UseCase<void, LogEntity[]> {
  /**
   * Create a new GetLogsUseCase instance.
   * @param logRepository the log repository.
   */ constructor(
    @inject("LogRepository") private readonly logRepository: LogRepository
  ) {
    super();
  }

  /**
   * Get the DO-DyDns logs.
   * @protected
   */
  protected usecaseLogic(): Promise<LogEntity[]> {
    return this.logRepository.getLogs();
  }
}

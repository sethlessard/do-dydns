import { UseCase } from "../UseCase";
import { LogEntity } from "../../entity/LogEntity";
import { inject, injectable } from "tsyringe";
import { LogRepository } from "../../datasource/repository/LogRepository";

@injectable()
export class GetLogs extends UseCase<void, LogEntity[]> {
  /**
   * Create a new GetLogs instance.
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
  protected useCaseLogic(): Promise<LogEntity[]> {
    return this.logRepository.getLogs();
  }
}

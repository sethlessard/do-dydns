import { inject, injectable } from "tsyringe";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { LogRepository } from "../../../datasources/repositories/LogRepository";
import { UseCase } from "../../UseCase";
import { GetAllLogsResponseEntity } from "./GetAllLogsResponseEntity";

// TODO: test
@injectable()
export class GetAllLogsUseCase extends UseCase<
  undefined,
  GetAllLogsResponseEntity
> {
  /**
   * GetAllLogsUseCase constructor.
   * @param logRepository the log repository.
   */
  constructor(
    @inject("LogRepository") private readonly logRepository: LogRepository
  ) {
    super();
  }

  /**
   * Get all DO-DyDns logs.
   */
  protected useCaseLogic(): Promise<
    GetAllLogsResponseEntity | ErrorResponseEntity
  > {
    return this.logRepository
      .getLogs()
      .then((logs) => ({ success: true, payload: logs }))
      .catch((error) => ({ success: false, error }));
  }
}

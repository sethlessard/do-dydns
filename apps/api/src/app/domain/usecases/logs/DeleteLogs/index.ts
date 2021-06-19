import { inject, injectable } from "tsyringe";
import { LogRepository } from "../../../datasources/repositories/LogRepository";
import {
  ResponseEntity,
  ErrorResponseEntity,
} from "../../../entities/ResponseEntity";
import { UseCase } from "../../UseCase";

// TODO: test
@injectable()
export class DeleteLogs extends UseCase<void, ResponseEntity<undefined>> {
  /**
   * DeleteLogs constructor.
   * @param logRepository the log repository.
   */
  constructor(
    @inject("LogRepository") private readonly logRepository: LogRepository
  ) {
    super();
  }

  /**
   * Delete logs.
   */
  protected useCaseLogic(): Promise<
    ResponseEntity<undefined> | ErrorResponseEntity
  > {
    return this.logRepository
      .deleteLogs()
      .then(() => ({ success: true, payload: undefined }))
      .catch((error) => ({ success: false, error }));
  }
}

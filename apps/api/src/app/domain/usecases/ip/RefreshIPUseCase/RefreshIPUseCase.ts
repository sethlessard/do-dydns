import { UseCase } from "../../UseCase";
import { RefreshIPResponseEntity } from "./RefreshIPResponseEntity";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { inject, injectable } from "tsyringe";
import { IPService } from "../../../datasources/services/IPService";

@injectable()
export class RefreshIPUseCase extends UseCase<void, RefreshIPResponseEntity> {
  constructor(@inject("IPService") private readonly ipService: IPService) {
    super();
  }

  /**
   * Refresh the public-facing IP address
   * @protected
   */
  protected useCaseLogic(): Promise<
    ErrorResponseEntity | RefreshIPResponseEntity
  > {
    return this.ipService
      .checkForChanges()
      .then((ipAddress) => ({ success: true, payload: ipAddress }))
      .catch((error) => ({ success: false, error }));
  }
}

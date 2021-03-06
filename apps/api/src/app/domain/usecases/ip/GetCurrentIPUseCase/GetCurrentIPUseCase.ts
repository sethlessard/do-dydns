import { IPRepository } from "../../../datasources/repositories/IPRepository";
import { GetCurrentIPResponseEntity } from "./GetCurrentIPReponseEntity";
import { UseCase } from "../../UseCase";
import { inject } from "tsyringe";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
export class GetCurrentIPUseCase extends UseCase<undefined, GetCurrentIPResponseEntity> {

  /**
   * GetCurrentIPUseCase constructor.
   * @param ipRepository the IP repository.
   */
  constructor(@inject("IPRepository") private readonly ipRepository: IPRepository) {
    super();
  }

  /**
   * Execute the use case. Get the current public IP address.
   * @returns the IP address response.
   */
  protected useCaseLogic(): Promise<GetCurrentIPResponseEntity | ErrorResponseEntity> {
    return this.ipRepository.getIP()
      .then(ip => ({ payload: ip, success: true }))
      .catch(error => ({ error, success: false }));
  }
}

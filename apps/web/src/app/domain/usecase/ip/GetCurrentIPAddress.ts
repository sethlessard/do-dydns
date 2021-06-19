import { UseCase } from "../UseCase";
import { IPRepository } from "../../datasource/repository/IPRepository";
import { inject, injectable } from "tsyringe";

// TODO: test
@injectable()
export class GetCurrentIPAddress extends UseCase<void, string> {
  /**
   * Get the current IP address.
   * @param ipRepository the IP repository.
   */
  constructor(
    @inject("IPRepository") private readonly ipRepository: IPRepository
  ) {
    super();

    // bind
    this.useCaseLogic = this.useCaseLogic.bind(this);
  }

  /**
   * Get the current public-facing IP address.
   */
  protected useCaseLogic(): Promise<string> {
    return this.ipRepository.getCurrentIPAddress();
  }
}

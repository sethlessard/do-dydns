import { UseCase } from "../UseCase";
import { inject, injectable } from "tsyringe";
import { DigitalOceanRepository } from "../../datasource/repository/DigitalOceanRepository";

@injectable()
export class SyncWithDigitalOceanUseCase extends UseCase<void, void> {
  /**
   * Create a new SyncWithDigitalOceanUseCase instance.
   * @param digitalOceanRepository the digital ocean repository.
   */
  constructor(
    @inject("DigitalOceanRepository")
    private readonly digitalOceanRepository: DigitalOceanRepository
  ) {
    super();
  }

  /**
   * Sync with Digital Ocean.
   * @protected
   */
  protected useCaseLogic(): Promise<void> {
    return this.digitalOceanRepository.syncWithDigitalOcean();
  }
}

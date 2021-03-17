import { inject } from "tsyringe";

import { DOService } from "../../../datasources/services/DOService";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { IPRepository } from "../../../datasources/repositories/IPRepository";
import { CreateNewDomainRequestEntity } from "./CreateNewDomainRequestEntity";
import { CreateNewDomainResponseEntity } from "./CreateNewDomainResponseEntity";
import { UseCase } from "../../UseCase";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
export class CreateNewDomainUseCase extends UseCase<CreateNewDomainRequestEntity, CreateNewDomainResponseEntity> {

  /**
   * CreateNewDomainUseCase constructor.
   * @param domainRepository the domain repository.
   * @param ipRepository the ip repository.
   * @param doService the DigitalOcean interface.
   */
  constructor(
    @inject("DomainRepository") private readonly domainRepository: DomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();
  }

  /**
   * Execute the use case. Create the new domain.
   */
  protected useCaseLogic(): Promise<CreateNewDomainResponseEntity | ErrorResponseEntity> {
    // get the current public-facing IP Address
    return this.ipRepository.getIP()
      // create the domain in DigitalOcean
      .then(ip => this.doService.createDomain(this._param!.name, ip))
      // store the domain in the database
      .then(({ name, ttl, zoneFile }) => this.domainRepository.insertOrUpdateDomain({ name, ttl, zoneFile }))
      // return the stored domain
      .then(d => ({ success: true, payload: d }))
      .catch(error => ({ success: false, error }));
  }
}

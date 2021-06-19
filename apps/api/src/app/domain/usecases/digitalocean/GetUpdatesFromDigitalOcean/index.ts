import { inject, injectable } from "tsyringe";

import { DOService } from "../../../datasources/services/DOService";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { GetUpdatesFromDigitalOceanResponseEntity } from "./GetUpdatesFromDigitalOceanResponseEntity";
import { UseCase } from "../../UseCase";
import { ZoneFileParserService } from "../../../datasources/services/ZoneFileParserService";
import { SubdomainEntity } from "../../../entities/SubdomainEntity";
import { ErrorResponseEntity } from "../../../entities/ResponseEntity";

// TODO: test
@injectable()
export class GetUpdatesFromDigitalOcean extends UseCase<
  undefined,
  GetUpdatesFromDigitalOceanResponseEntity
> {
  /**
   * GetUpdatesFromDigitalOcean constructor.
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   * @param doService the DigitalOcean interface.
   * @param zoneFileParserService the DNS zone file parsing service.
   */
  constructor(
    @inject("DomainRepository")
    private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository")
    private readonly subdomainRepository: SubdomainRepository,
    @inject("DOService") private readonly doService: DOService,
    @inject("ZoneFileParserService")
    private readonly zoneFileParserService: ZoneFileParserService
  ) {
    super();
  }

  /**
   * Execute the use case and get the latest updates from DigitalOcean.
   */
  protected useCaseLogic(): Promise<
    GetUpdatesFromDigitalOceanResponseEntity | ErrorResponseEntity
  > {
    // get the updates from DigitalOcean
    return (
      this.doService
        .refreshDomainsAndSubdomains()
        // for each domain found, parse the zone file
        .then((domains) =>
          Promise.all(
            domains.map((d) => {
              const zoneFile = this.zoneFileParserService.parseZoneFile(
                d.zoneFile
              );
              // find the subdomains
              const subdomains = zoneFile.a?.map(
                (a) =>
                  Object.assign(a, {
                    domain: d.name,
                    aRecordName: a.name,
                  }) as Partial<SubdomainEntity>
              );
              // TODO: if subdomain.name = '@', then subdomain.name should be the value of domain.name
              return this.domainRepository
                .insertOrUpdateDomain(d)
                .then((domain) =>
                  Promise.all(
                    subdomains.map((s) =>
                      this.subdomainRepository.insertOrUpdateSubdomain(
                        Object.assign(s, { domainID: domain.id })
                      )
                    )
                  )
                );
            })
          )
        )
        .then(() => ({ success: true, payload: undefined }))
        .catch((error) => ({ success: false, error }))
    );
  }
}

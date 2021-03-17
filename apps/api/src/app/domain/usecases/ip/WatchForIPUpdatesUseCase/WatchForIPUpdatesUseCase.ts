import { ErrorResponseEntity } from "../../../entities/ResponseEntity";
import { inject, singleton } from "tsyringe";
import { UseCase } from "../../UseCase";
import { DomainRepository } from "../../../datasources/repositories/DomainRepository";
import { SubdomainRepository } from "../../../datasources/repositories/SubdomainRepository";
import { IPRepository } from "../../../datasources/repositories/IPRepository";
import { IPService } from "../../../datasources/services/IPService";
import { DOService } from "../../../datasources/services/DOService";
import { DomainEntity } from "../../../entities/DomainEntity";

@singleton()
export class WatchForIPUpdatesUseCase extends UseCase<void, void> {

  /**
   * Create a new WatchForIPUpdatesUseCase instance.
   * @param domainRepository the domain repository.
   * @param subdomainRepository the subdomain repository.
   * @param ipRepository the ip repository.
   * @param ipService the ip service.
   * @param doService the digital ocean service.
   */
  constructor(
    @inject("DomainRepository") private readonly domainRepository: DomainRepository,
    @inject("SubdomainRepository") private readonly subdomainRepository: SubdomainRepository,
    @inject("IPRepository") private readonly ipRepository: IPRepository,
    @inject("IPService") private readonly ipService: IPService,
    @inject("DOService") private readonly doService: DOService
  ) {
    super();

    // bind
    this.useCaseLogic = this.useCaseLogic.bind(this);
  }

  /**
   * Start watching for updates to the public-facing IP address.
   * When changes occur, the active domains/subdomains should be updated
   * in DigitalOcean with the new public-facing IP address.
   */
  protected useCaseLogic(): Promise<void | ErrorResponseEntity> {
    // start watching for changes in the IP address
    this.ipService.onIPAddressChanged((newIPAddress: string) => {
      this.ipRepository.updateIP(newIPAddress);
      this.domainRepository.getActiveDomains()
        .then(activeDomains => {
          if (activeDomains.length === 0) { return; }

          // gather all domains/subdomains to update the IP address of
          type DNSRecordsToUpdate = { [domain: string]: string[] };
          return activeDomains.reduce<Promise<DNSRecordsToUpdate>>((accumulator: Promise<DNSRecordsToUpdate>, domain: DomainEntity): Promise<DNSRecordsToUpdate> => {
            return Promise.all([this.subdomainRepository.getActiveSubdomainsForDomain(domain.id), accumulator])
              .then(([subdomains, dnsRecordsToUpdate]) => {
                dnsRecordsToUpdate[domain.name] = subdomains.map(s => s.name);
                return dnsRecordsToUpdate;
              });
          }, Promise.resolve({}));
        })
        .then(ipRecordsToUpdate => {
          if (ipRecordsToUpdate) {
            this.doService.updateIPOfDomainsAndSubdomains(ipRecordsToUpdate, newIPAddress);
          }
        });
    });
    return Promise.resolve();
  }
}

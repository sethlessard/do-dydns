import { DODomainRecordEntity, RecordType } from "../digitalocean/DODomainRecordEntity";
import { SubdomainEntity } from "../SubdomainEntity";

// TODO: test
export class DODomainRecordEntityToSubdomainEntityMapper {

  private readonly doDomainRecordEntity: DODomainRecordEntity;

  /**
   * DODomainRecordEntityToSubdomainEntityMapper constructor.
   * @param doDomainRecordEntity the DODomainRecord entity 
   */
  constructor(doDomainRecordEntity: DODomainRecordEntity) {
    this.doDomainRecordEntity = doDomainRecordEntity;
  }

  /**
   * Map a DODomainRecordEntity to a SubdomainEntity.
   * Set's the name (short version), ttl, and digitalOceanID properties.
   * @returns the SubdomainEntity.
   */
  map(): Partial<SubdomainEntity> {
    if (this.doDomainRecordEntity.type !== RecordType.A) {
      throw new Error("Subdomains can only be A or AAAA records.");
    }
    const { id: digitalOceanID, name, ttl } = this.doDomainRecordEntity;
    return {
      name,
      ttl,
      digitalOceanID
    };
  }
}

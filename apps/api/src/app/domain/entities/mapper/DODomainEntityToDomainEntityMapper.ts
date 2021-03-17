import { DODomainEntity } from "../digitalocean/DODomainEntity";
import { DomainEntity } from "../DomainEntity";

// TODO: test
export class DODomainEntityToDomainEntityMapper {

  private readonly doDomainEntity: DODomainEntity;

  /**
   * DODomainEntityToDomainEntityMapper constructor.
   * @param doDomainEntity the digital ocean domain entity. 
   */
  constructor(doDomainEntity: DODomainEntity) {
    this.doDomainEntity = doDomainEntity;
  }

  /**
   * Map a DODomainEntity to a DomainEntity.
   * Sets the name, ttl, and zoneFile properties.
   * @returns the DomainEntity.
   */
  map(): Partial<DomainEntity> {
    const { name, ttl, zoneFile } = this.doDomainEntity;
    return {
      name,
      ttl,
      zoneFile
    };
  }
}

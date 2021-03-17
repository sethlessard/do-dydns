import { SubdomainEntity } from "../../../domain/entities/SubdomainEntity";
import { SubdomainModel } from "../SubdomainModel";

// TODO: test
export class SubdomainModelToSubomainEntityMapper {

  /**
   * Create a new SubdomainModelToSubdomainEntityMapper.
   * @param subdomainModel the data-layer subdomain model.
   */
  constructor(private readonly subdomainModel: SubdomainModel) { }

  /**
   * Map a data-layer SubdomainModel to a domain-layer SubdomainEntity.
   * @returns the domain-layer SubdomainEntity.
   */
  map(): SubdomainEntity {
    const { id, domain, domainID, digitalOceanID, name, fullName, ip, active, ttl, created, updated } = this.subdomainModel;
    return {
      id,
      domain,
      domainID,
      digitalOceanID,
      name,
      fullName,
      ip,
      active,
      ttl,
      created,
      updated
    };
  }
}

import { DomainEntity } from "../../../domain/entities/DomainEntity";
import { DomainModel } from "../DomainModel";

// TODO: test
export class DomainModelToDomainEntityMapper {

  /**
   * DomainModelToDomainEntityMapper constructor.
   * @param domainModel the domain model.
   */
  constructor(private readonly domainModel: DomainModel) { }

  /**
   * Map the data-layer domain model to a domain-layer domain model.
   */
  map(): DomainEntity {
    const { id, name, ttl, zoneFile, active, created, updated } = this.domainModel;
    return {
      id,
      name,
      ttl,
      zoneFile,
      active,
      created,
      updated
    };
  }
}

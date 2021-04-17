import { DomainModel } from "../../models/DomainModel";
import { DomainModelToDomainEntityMapper } from "../../models/mappers/DomainModelToDomainEntityMapper";
import { Connection, Repository } from "typeorm";
import { TypeormRepositoryFactory } from "./factory/TypeormRepositoryFactory";
import { DomainEntity } from "../../../domain/entities/DomainEntity";
import { DomainRepository } from "../../../domain/datasources/repositories/DomainRepository";

// TODO: test
export class DomainRepositoryImpl implements DomainRepository {
  private readonly domainRepository: Repository<DomainModel>;

  /**
   * Create a DomainRepositoryImpl instance.
   * @param connection the Typeorm connection.
   */
  constructor(connection: Connection) {
    this.domainRepository = connection.getRepository(DomainModel);
  }

  /**
   * Clear all domain entries in the repository (this doesn't affect Digital Ocean).
   */
  clearDomainEntries(): Promise<void> {
    return this.domainRepository.clear();
  }

  /**
   * Delete a DomainEntity from the repository.
   * @param domainID the ID of the domain.
   * @returns the deleted DomainEntity.
   */
  deleteDomain(domainID: number): Promise<DomainEntity> {
    return this.domainRepository.findOne({ id: domainID }).then((domain) => {
      if (!domain) {
        throw new Error(`Domain with id '${domainID}' not found.`);
      }
      return this.domainRepository
        .delete({ id: domainID })
        .then(() => new DomainModelToDomainEntityMapper(domain).map());
    });
  }

  /**
   * Get all active domains.
   */
  getActiveDomains(): Promise<DomainEntity[]> {
    return this.domainRepository
      .find({ active: true })
      .then((results) =>
        results.map((d) => new DomainModelToDomainEntityMapper(d).map())
      );
  }

  /**
   * Get a domain by its ID.
   * @param domainID the ID of the domain.
   * @returns the domain or undefined.
   */
  getDomainByID(domainID: number): Promise<DomainEntity | undefined> {
    return this.domainRepository
      .findOne({ id: domainID })
      .then((domain) =>
        domain ? new DomainModelToDomainEntityMapper(domain).map() : undefined
      );
  }

  /**
   * Get a domain by its name.
   * @param domain the name of the domain.
   * @returns the domain or undefined.
   */
  getDomainByName(domain: string): Promise<DomainEntity | undefined> {
    return this.domainRepository
      .findOne({ name: domain })
      .then((domain) =>
        domain ? new DomainModelToDomainEntityMapper(domain).map() : undefined
      );
  }

  /**
   * Get all of the domains.
   * @returns all of the domains.
   */
  getDomains(): Promise<DomainEntity[]> {
    return this.domainRepository
      .find()
      .then((domains) =>
        domains.map((d) => new DomainModelToDomainEntityMapper(d).map())
      );
  }

  /**
   * Insert/update a domain into the repository.
   * @param domain the domain.
   * @returns the domain.
   */
  insertOrUpdateDomain(domain: Partial<DomainEntity>): Promise<DomainEntity> {
    return this.domainRepository
      .findOne({ name: domain.name })
      .then((existingDomain) => {
        if (existingDomain) {
          return this.domainRepository
            .update({ id: existingDomain.id }, domain)
            .then(() =>
              this.domainRepository.findOne({ id: existingDomain.id })
            );
        } else {
          domain.active = false;
          return this.domainRepository
            .insert(domain)
            .then(() => this.domainRepository.findOne({ name: domain.name }));
        }
      })
      .then((domain) => {
        if (!domain) {
          throw new Error("Unable to insert the domain.");
        }
        return new DomainModelToDomainEntityMapper(domain).map();
      });
  }
}

/**
 * Get the DomainRepositoryImpl
 */
export function getDomainRepositoryImpl(): DomainRepositoryImpl {
  return new TypeormRepositoryFactory<DomainRepositoryImpl>().create(
    DomainRepositoryImpl
  );
}

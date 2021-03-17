import { Connection, Repository } from "typeorm";

import { SubdomainModel } from "../../models/SubdomainModel";
import { SubdomainModelToSubomainEntityMapper } from "../../models/mappers/SubdomainModelToSubdomainEntityMapper";
import { TypeormRepositoryFactory } from "./factory/TypeormRepositoryFactory";
import { SubdomainRepository } from "../../../domain/datasources/repositories/SubdomainRepository";
import { SubdomainEntity } from "../../../domain/entities/SubdomainEntity";

// TODO: test
export class SubdomainRepositoryImpl implements SubdomainRepository {

  private readonly subdomainRepository: Repository<SubdomainModel>;

  /**
   * Create a new SubdomainRepositoryImpl instance.
   * @param connection Create a SubdomainRepositoryImpl instance.
   */
  constructor(connection: Connection) {
    this.subdomainRepository = connection.getRepository(SubdomainModel);
  }

  /**
   * Delete all subdomains for a specified domain.
   * @param domainID the ID of the domain.
   * @returns the deleted subdomains.
   */
  deleteAllSubdomainsForDomain(domainID: string): Promise<SubdomainEntity[]> {
    return this.subdomainRepository.find({ domainID })
      .then(subdomains => this.subdomainRepository.delete({ domainID })
        .then(() => subdomains.map(s => new SubdomainModelToSubomainEntityMapper(s).map())));
  }

  /**
   * Delete a subdomain.
   * @param domainID the ID of the domain.
   * @param subdomainID the ID of the subdomain.
   * @returns the deleted subdomain.
   */
  deleteSubdomain(domainID: string, subdomainID: string): Promise<SubdomainEntity> {
    return this.subdomainRepository.findOne({ domainID, id: subdomainID })
      .then(existingSubdomain => {
        if (!existingSubdomain) {
          throw new Error(`The subdomain with domain id '${domainID}' and id '${subdomainID}' was not found!`);
        }
        return this.subdomainRepository.delete({ domainID, id: subdomainID })
          .then(() => new SubdomainModelToSubomainEntityMapper(existingSubdomain).map());
      });
  }

  /**
   * Get all of the active subdomains for a given domain.
   * @param domainID the ID of the domain.
   * @returns the active subdomains.
   */
  getActiveSubdomainsForDomain(domainID: string): Promise<SubdomainEntity[]> {
    return this.subdomainRepository.find({ domainID: domainID, active: true })
      .then(subdomains => subdomains.map(s => new SubdomainModelToSubomainEntityMapper(s).map()));
  }

  /**
   * Get a subdomain by its ID.
   * @param domainID the ID of the domain.
   * @param subdomainID the subdomain ID.
   * @returns the Subdomain or undefined.
   */
  getSubdomainByID(domainID: string, subdomainID: string): Promise<SubdomainEntity | undefined> {
    return this.subdomainRepository.findOne({ domainID, id: subdomainID })
      .then(subdomain => (subdomain) ? new SubdomainModelToSubomainEntityMapper(subdomain).map() : undefined);
  }

  /**
   * Get all of the subdomains for a given domain.
   * @param domainID the ID of the domain.
   * @returns the subdomains.
   */
  getSubdomainsForDomain(domainID: string): Promise<SubdomainEntity[]> {
    return this.subdomainRepository.find({ domainID })
      .then(subdomains => subdomains.map(s => new SubdomainModelToSubomainEntityMapper(s).map()));
  }

  /**
   * Insert/update a subdomain into the repository.
   * @param subdomain the subdomain.
   * @returns the inserted/updated subdomain.
   */
  insertOrUpdateSubdomain(subdomain: Partial<SubdomainEntity>): Promise<SubdomainEntity> {
    return this.subdomainRepository.findOne({ name: subdomain.name, domain: subdomain.domain })
      .then(existingSubdomain => {
        if (existingSubdomain) {
          return this.subdomainRepository.update({ id: existingSubdomain.id }, subdomain)
            .then(() => this.subdomainRepository.findOne({ id: existingSubdomain.id }));
        } else {
          return this.subdomainRepository.insert(subdomain)
            .then(() => this.subdomainRepository.findOne({ name: subdomain.name, domain: subdomain.domain }));
        }
      })
      .then(subdomain => {
        if (!subdomain) {
          throw new Error("Unable to insert/update the subdomain.");
        }
        return new SubdomainModelToSubomainEntityMapper(subdomain).map();
      });
  }
}

/**
 * Get a SubdmainRepositoryImpl.
 */
export function getSubdomainRepositoryImpl(): SubdomainRepositoryImpl {
  return new TypeormRepositoryFactory<SubdomainRepositoryImpl>().create(SubdomainRepositoryImpl);
}

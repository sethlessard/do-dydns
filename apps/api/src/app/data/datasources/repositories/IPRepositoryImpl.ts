import { IPRepository } from "../../../domain/datasources/repositories/IPRepository";
import { Connection, Repository } from "typeorm";
import { IPAddressModel } from "../../models/IPAddressModel";
import { TypeormRepositoryFactory } from "./factory/TypeormRepositoryFactory";

// TODO: test
export class IPRepositoryImpl implements IPRepository {

  private readonly ipRepository: Repository<IPAddressModel>;

  /**
   * Create a new IPRepositoryImpl instance.
   * @param connection the Typeorm connection.
   */
  constructor(connection: Connection) {
    this.ipRepository = connection.getRepository(IPAddressModel);
  }

  /**
   * Get the current IP Address.
   * @returns the current public IP address.
   */
  getIP(): Promise<string> {
    return this.ipRepository.findOne({ id: "0" })
      .then(model => model?.ipAddress ?? "x.x.x.x");
  }

  /**
   * Update the current public IP Address.
   * @param ip the IP Address.
   * @returns the IP Address.
   */
  updateIP(ip: string): Promise<string> {
    return this.ipRepository.findOne({ id: "0" })
      .then(model => {
        if (!model) {
          return this.ipRepository.insert({ id: "0", ipAddress: ip })
            .then(() => Promise.resolve());
        }
        return this.ipRepository.update({ id: "0" }, { ipAddress: ip })
          .then(() => Promise.resolve());
      })
      // .then(model => (model) ? this.ipRepository.update({ id: "0" }, { ipAddress: ip }) : this.ipRepository.insert({ id: "0", ipAddress: ip }))
      .then(() => ip);
  }
}

/**
 * Get a new IPRepositoryImpl instance
 */
export function getIPRepositoryImpl(): IPRepositoryImpl {
  return new TypeormRepositoryFactory<IPRepositoryImpl>().create(IPRepositoryImpl);
}

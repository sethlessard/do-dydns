import { TypeormConnectionRegister } from "../../../TypeormConnectionRegister";
import { Connection } from "typeorm";

export class TypeormRepositoryFactory<RepositoryType> {
  
  private readonly _connectionRegister: TypeormConnectionRegister = TypeormConnectionRegister.getInstance();

  /**
   * Create an instance of a TypeormRepository
   * @param repositoryConstructor the type of Repository to create.
   */
  create(repositoryConstructor: new (connection: Connection) => RepositoryType): RepositoryType {
    return new repositoryConstructor(this._connectionRegister.getConnection());
  }
}

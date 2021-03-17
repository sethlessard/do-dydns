import { Connection } from "typeorm";

export class TypeormConnectionRegister {
  private static _instance?: TypeormConnectionRegister;

  /**
   * Get the TypeormConnectionRegister instance
   */
  static getInstance(): TypeormConnectionRegister {
    if (!TypeormConnectionRegister._instance) {
      TypeormConnectionRegister._instance = new TypeormConnectionRegister();
    }
    return TypeormConnectionRegister._instance;
  }

  private _connection?: Connection;

  /**
   * Get the Typeorm connection.
   * @returns the Typeorm connection.
   */
  getConnection(): Connection {
    if (!this._connection) {
      throw new Error("You forgot to call 'registerConnection()' with the Typeorm connection object.");
    }
    return this._connection;
  }

  /**
   * Register the Typeorm connection.
   * @param connection the Typeorm connection.
   */
  registerConnection(connection: Connection): void {
    this._connection = connection;
  }
}
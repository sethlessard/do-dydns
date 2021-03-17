import { LogEntity } from "../../../domain/entities/LogEntity";
import { LogModel } from "../LogModel";

// TODO: test
export class LogModelToLogEntityMapper {

  /**
   * Create a new LogModelToLogEntityMapper instance.
   * @param logModel the data-layer log model.
   */
  constructor(private readonly logModel: LogModel) { }

  /**
   * Map a data-layer LogModel to a domain-layer LogEntity.
   * @returns the domain-layer LogEntity.
   */
  map(): LogEntity {
    const { id, message, logLevel, created, updated } = this.logModel;
    return {
      id,
      message,
      logLevel,
      created,
      updated
    };
  }
}

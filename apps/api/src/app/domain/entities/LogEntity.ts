import { StoredEntity } from "./StoredEntity";

export enum LogLevel {
  Error,
  Debug,
  Info,
  Warning
}

export interface LogEntity extends StoredEntity {

  /**
   * The log message.
   */
  message: string;

  /**
   * The log level.
   */
  logLevel: LogLevel;
}

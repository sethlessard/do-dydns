import { StoredEntity } from "./StoredEntity";

export enum LogLevel {
  Error = "Error",
  Debug = "Debug",
  Info = "Info",
  Warning = "Warning",
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

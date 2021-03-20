import { ApiEntity } from "@do-dydns/api-definition";

export enum LogLevel {
  Error = "Error",
  Debug = "Debug",
  Info = "Info",
  Warning = "Warning",
}

export interface ApiLogEntity extends ApiEntity {
  /**
   * The log message.
   */
  message: string;

  /**
   * The log level.
   */
  logLevel: LogLevel;
}

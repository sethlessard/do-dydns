import { Column, Entity } from "typeorm";
import { StoredModel } from "./StoredModel";

export enum LogLevel {
  Debug,
  Error,
  Info,
  Warning
}

@Entity()
export class LogModel extends StoredModel {

  @Column()
  message: string;

  @Column({ type: "int" })
  logLevel: LogLevel;
}

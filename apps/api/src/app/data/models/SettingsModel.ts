import { Column, Entity } from "typeorm";
import { StoredModel } from "./StoredModel";

@Entity()
export class SettingsModel extends StoredModel {

  /**
   * The DigitalOcean API key.
   * 
   * This is stupidly insecure you dummy. Encrypt this one day.
   */
  @Column()
  apiKey: string;

  /**
   * The amount of time, in minutes, to check for public IP address updates.
   */
  @Column()
  networkUpdateIntervalMinutes: number;
}

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
   * The update interval, in minutes, to synchronize with Digital Ocean.
   */
  @Column()
  digitalOceanUpdateInterval: number;

  /**
   * The update interval, in minutes, to check for changes in the public-facing IP address.
   */
  @Column()
  publicIPUpdateInterval: number;
}

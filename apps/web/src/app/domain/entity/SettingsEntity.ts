import { StoredEntity } from "./StoredEntity";

export interface SettingsEntity extends StoredEntity {
  /**
   * The DigitalOcean api key.
   */
  apiKey: string;

  /**
   * The update interval, in minutes, to synchronize with Digital Ocean.
   */
  digitalOceanUpdateInterval: number;

  /**
   * The update interval, in minutes, to check for changes in the public-facing IP address.
   */
  publicIPUpdateInterval: number;
}

import { StoredEntity } from "./StoredEntity";

export interface SettingsEntity extends StoredEntity {

  /**
   * The DigitalOcean api key.
   */
  apiKey: string;

  /**
   * The update interval, in minutes, to check/update DigitalOcean with 
   * the current public IP Address. 
   */
  networkUpdateIntervalMinutes: number;
}

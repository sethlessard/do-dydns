import { ApiEntity } from "./ApiEntity";

export interface ApiSettingsEntity extends ApiEntity {

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

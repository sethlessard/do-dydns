import { ApiEntity } from "./ApiEntity";

export interface ApiSettingsResponseEntity extends ApiEntity {
  /**
   * True if the user's Digital Ocean API key is set and valid, false if not.
   */
  apiKeyValid: boolean;

  /**
   * The update interval, in minutes, to synchronize with Digital Ocean.
   */
  digitalOceanUpdateInterval: number;

  /**
   * The update interval, in minutes, to check for changes in the public-facing IP address.
   */
  publicIPUpdateInterval: number;
}

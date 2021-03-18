import { ApiSuccessResponse } from "../ApiSuccessResponse";
import { ApiSettingsEntity } from "../entities/ApiSettingsEntity";

export interface ApiSettingsResponse extends ApiSuccessResponse {

  /**
   * The settings.
   */
  settings: ApiSettingsEntity;
}

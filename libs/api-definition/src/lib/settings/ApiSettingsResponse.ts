import { ApiSuccessResponse } from "../ApiSuccessResponse";
import { ApiSettingsResponseEntity } from "../entities";

export interface ApiSettingsResponse extends ApiSuccessResponse {
  /**
   * The settings.
   */
  settings: ApiSettingsResponseEntity;
}

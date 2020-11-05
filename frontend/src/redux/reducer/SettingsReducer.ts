import { Action } from "redux";
import SettingsModel from "../../model/SettingsModel";
import { UPDATE_SETTINGS, FETCH_SETTINGS_ERROR, UpdateSettingsAction } from "../action/Settings";

export interface SettingsState {
  settings: SettingsModel;
}

const SettingsReducer = (state: SettingsState = {
  settings: {
    _id: "0",
    apiKey: "",
    networkUpdateIntervalMinutes: 15,
    recordCreated: Date.now(),
    recordUpdated: Date.now()
  }
}, action: Action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case FETCH_SETTINGS_ERROR:
      // TODO: implement
      break;
    case UPDATE_SETTINGS:
      newState.settings = (action as UpdateSettingsAction).settings;
      break;
    default:
      break;
  }

  return newState;
};

export default SettingsReducer;

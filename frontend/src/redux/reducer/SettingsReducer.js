import { UPDATE_SETTINGS, FETCH_SETTINGS_ERROR } from "../action/Settings";

const SettingsReducer = (state = {
  settings: {
    apiToken: "",
    networkUpdateInterval: 15 * 60 * 1000
  }
}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case FETCH_SETTINGS_ERROR:
      // TODO: implement
      break;
    case UPDATE_SETTINGS:
      newState.settings = action.settings;
      break;
    default:
      break;
  }

  return newState;
};

export default SettingsReducer;

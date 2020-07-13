import { UPDATE_API_KEY, FETCH_API_KEY_ERROR } from "../action/Settings";

const SettingsReducer = (state = {
  apiToken: ""
}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case FETCH_API_KEY_ERROR:
      // TODO: implement
      break;
    case UPDATE_API_KEY:
      newState.apiToken = action.apiToken;
      break;
    default:
      break;
  }

  return newState;
};

export default SettingsReducer;

// import { getSettingsControllerInstance } from "../../controller/SettingsController";

const SettingsReducer = (state = {
  apiToken: ""
}, action) => {
  const newState = Object.assign({}, state);
  // const settingsController = getSettingsControllerInstance();

  switch (action.type) {
    default:
      break;
  }

  return newState;
};

export default SettingsReducer;

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ApplicationReducer from "./ApplicationReducer";
import SettingsReducer from "./SettingsReducer";

const reducer = (history) => combineReducers({
  router: connectRouter(history),
  application: ApplicationReducer,
  settings: SettingsReducer
});

export default reducer;

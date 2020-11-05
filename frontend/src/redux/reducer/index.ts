import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ApplicationReducer from "./ApplicationReducer";
import SettingsReducer from "./SettingsReducer";
import { History } from "history";

const reducer = (history: History) => combineReducers({
  router: connectRouter(history),
  application: ApplicationReducer,
  settings: SettingsReducer
});

export default reducer;

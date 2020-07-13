import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import reducer from "./reducer";

export const history = createBrowserHistory();

const configureStore = () => {
  return createStore(
    reducer(history),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  )
};

export default configureStore;

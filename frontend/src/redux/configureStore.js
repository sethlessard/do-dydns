import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import reducer from "./reducer";

export const history = createBrowserHistory();

let store = null;
const configureStore = (preloadedState) => {
  if (!store) {
    store = createStore(
      reducer(history),
      preloadedState,
      composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
    )
  }
  return store;
};

export default configureStore;

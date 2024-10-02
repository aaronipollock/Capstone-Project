import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import notebookReducer from "./notebooks";
import noteReducer from "./notes";
import tagReducer from "./tags";

const LOG_OUT = 'session/logout';

const appReducer = combineReducers({
  session: sessionReducer,
  notebooks: notebookReducer,
  notes: noteReducer,
  tags: tagReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
}

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export const logout = () => ({ type: LOG_OUT });

export default configureStore;

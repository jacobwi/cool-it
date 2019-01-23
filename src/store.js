import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import reducers from "./reducers";

const middleWare = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;

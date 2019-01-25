import { combineReducers } from "redux";

import { authenticationReducer } from "./authenticationReducer";
import { groupReducer } from "./groupReducer";

export default combineReducers({
  authentication: authenticationReducer,
  groups: groupReducer
});

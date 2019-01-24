import { SET_USER, SET_LOADER } from "../actions/types";
import { isEmpty } from "lodash";
// IN PRODUCTION ENV SET isAuth.. to false
const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  isLoading: true
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isLoading: false
      };

    case SET_LOADER:
      return {
        isLoading: action.payload
      };
    default:
      return state;
  }
}

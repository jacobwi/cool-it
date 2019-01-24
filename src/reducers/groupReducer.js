import { SET_CURRENT_GROUP } from "../actions/types";

const INITIAL_STATE = {
  currentGroup: null
};

export const groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload.currentGroup
      };
    default:
      return state;
  }
};

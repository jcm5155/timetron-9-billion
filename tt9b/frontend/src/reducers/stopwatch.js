import { SET_SPLIT, CLEAR_SPLITS } from "../actions/types.js";

const initialState = {
  splits: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPLIT:
      return {
        ...state,
        splits: [action.payload, ...state.splits]
      };
    case CLEAR_SPLITS:
      return {
        ...state,
        splits: []
      };
    default:
      return state;
  }
}

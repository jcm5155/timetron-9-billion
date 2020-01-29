import { CREATE_MESSAGE } from "../actions/types";

const initialState = {};

// Reducer for messages
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}

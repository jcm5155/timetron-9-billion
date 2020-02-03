import {
  GET_ROUTINES,
  DELETE_ROUTINE,
  ADD_ROUTINE,
  SET_CURRENT_ROUTINE,
  UPDATE_ROUTINE,
  TOGGLE_TIMER
} from "../actions/types.js";

const initialState = {
  routines: [],
  current_routine: null,
  timer_running: false
};

// Reducer for routine actions
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTINES:
      return {
        ...state,
        routines: action.payload
      };
    case DELETE_ROUTINE:
      return {
        ...state,
        routines: state.routines.filter(routine => routine.id !== action.payload)
      };
    case UPDATE_ROUTINE:
      return {
        ...state,
        current_routine: action.payload,
        routines: [
          action.payload,
          ...state.routines.filter(routine => routine.id !== action.payload.id)
        ]
      };
    case ADD_ROUTINE:
      return {
        ...state,
        routines: [...state.routines, action.payload]
      };
    case SET_CURRENT_ROUTINE:
      return {
        ...state,
        current_routine: action.payload
      };
    case TOGGLE_TIMER:
      return {
        ...state,
        timer_running: action.payload
      };
    default:
      return state;
  }
}

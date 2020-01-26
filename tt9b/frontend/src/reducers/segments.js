import { GET_SEGMENTS, DELETE_SEGMENT, ADD_SEGMENT } from "../actions/types.js";
import { sortSegmentsByOrder } from "../utils/SharedFunctions";

const initialState = {
  segments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEGMENTS:
      return {
        ...state,
        segments: sortSegmentsByOrder(action.current_routine_order, action.payload)
      };
    case DELETE_SEGMENT:
      return {
        ...state,
        segments: state.segments.filter(segment => segment.id !== action.payload),
        segment_order: sortSegmentsByOrder(action.current_routine_order, action.payload)
      };
    case ADD_SEGMENT:
      return {
        ...state,
        segments: [...state.segments, action.payload],
        segment_order: sortSegmentsByOrder(action.current_routine_order, action.payload)
      };
    default:
      return state;
  }
}

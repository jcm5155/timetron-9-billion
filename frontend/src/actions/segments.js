import axios from "axios";
import { GET_SEGMENTS, DELETE_SEGMENT, ADD_SEGMENT, UPDATE_SEGMENT_ORDER } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// Gets segments associated with the current routine
export const getSegments = id => async (dispatch, getState) => {
  try {
    const currentRoutineOrder = getState().routines.current_routine.order;
    const response = await axios.get(`/api/segments/?id=${id}`, tokenConfig(getState));
    dispatch({
      type: GET_SEGMENTS,
      payload: response.data,
      current_routine_order: currentRoutineOrder
    });
  } catch (error) {
    return dispatch(returnErrors(error.response.data, error.response.status));
  }
};

// Deletes a segment
export const deleteSegment = id => (dispatch, getState) => {
  axios
    .delete(`/api/segments/${id}/`, tokenConfig(getState))
    .then(response => {
      dispatch(createMessage({ segmentDelete: "Segment Deleted" }));
      dispatch({
        type: DELETE_SEGMENT,
        payload: id
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// Adds a segment to the current routine
export const addSegment = segment => async (dispatch, getState) => {
  axios
    .post("/api/segments/", segment, tokenConfig(getState))
    .then(response => {
      dispatch(createMessage({ segmentAdded: "Segment Added" }));
      dispatch({
        type: ADD_SEGMENT,
        payload: response.data
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// Updates the segment order of the application state (not the current routine's order property)
export const updateSegmentOrder = segments => ({
  type: UPDATE_SEGMENT_ORDER,
  payload: segments
});

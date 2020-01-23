import axios from "axios";
import { GET_SEGMENTS, DELETE_SEGMENT, ADD_SEGMENT } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// GET SEGMENTS
export const getSegments = id => (dispatch, getState) => {
  axios
    .get(`/api/segments/?id=${id}`, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: GET_SEGMENTS,
        payload: response.data
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// DELETE SEGMENT
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

// ADD SEGMENT
export const addSegment = segment => (dispatch, getState) => {
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

import axios from "axios";
import { GET_SEGMENTS, DELETE_SEGMENT, ADD_SEGMENT, GET_ERRORS } from "./types";
import { createMessage } from "./messages";

// GET SEGMENTS
export const getSegments = () => dispatch => {
  axios
    .get("/api/segments/")
    .then(response => {
      dispatch({
        type: GET_SEGMENTS,
        payload: response.data
      });
    })
    .catch(error => {
      const errors = {
        msg: error.response.data,
        status: error.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

// DELETE SEGMENT
export const deleteSegment = id => dispatch => {
  axios
    .delete(`/api/segments/${id}/`)
    .then(response => {
      dispatch(createMessage({ segmentDelete: "Segment Deleted" }));
      dispatch({
        type: DELETE_SEGMENT,
        payload: id
      });
    })
    .catch(error => {
      const errors = {
        msg: error.response.data,
        status: error.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

// ADD SEGMENT
export const addSegment = segment => dispatch => {
  axios
    .post("/api/segments/", segment)
    .then(response => {
      dispatch(createMessage({ segmentAdded: "Segment Added" }));
      dispatch({
        type: ADD_SEGMENT,
        payload: response.data
      });
    })
    .catch(error => {
      const errors = {
        msg: error.response.data,
        status: error.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

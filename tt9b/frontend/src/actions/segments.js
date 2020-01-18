import axios from "axios";
import { GET_SEGMENTS, DELETE_SEGMENT, ADD_SEGMENT } from "./types";
import { createMessage, returnErrors } from "./messages";

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
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
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
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
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
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

import axios from "axios";
import { GET_SEGMENTS, DELETE_SEGMENT, ADD_SEGMENT } from "./types";

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
    .catch(error => console.log(error));
};

// DELETE SEGMENT
export const deleteSegment = id => dispatch => {
  axios
    .delete(`/api/segments/${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_SEGMENT,
        payload: id
      });
    })
    .catch(error => console.log(error));
};

// ADD SEGMENT
export const addSegment = segment => dispatch => {
  axios
    .post("/api/segments/", segment)
    .then(response => {
      dispatch({
        type: ADD_SEGMENT,
        payload: response.data
      });
    })
    .catch(error => console.log(error));
};

import axios from "axios";
import { GET_ROUTINES, DELETE_ROUTINE, ADD_ROUTINE, GET_ERRORS } from "./types";
import { createMessage } from "./messages";

// GET ROUTINES
export const getRoutines = () => dispatch => {
  axios
    .get("/api/routines/")
    .then(response => {
      dispatch({
        type: GET_ROUTINES,
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

// DELETE ROUTINE
export const deleteRoutine = id => dispatch => {
  axios
    .delete(`/api/routines/${id}/`)
    .then(response => {
      dispatch(createMessage({ routineDelete: "Routine Deleted" }));
      dispatch({
        type: DELETE_ROUTINE,
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

// ADD ROUTINE
export const addRoutine = routine => dispatch => {
  axios
    .post("/api/routines/", routine)
    .then(response => {
      dispatch(createMessage({ routineAdd: "Routine Added" }));
      dispatch({
        type: ADD_ROUTINE,
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

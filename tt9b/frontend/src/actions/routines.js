import axios from "axios";
import { GET_ROUTINES, DELETE_ROUTINE, ADD_ROUTINE } from "./types";

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
    .catch(error => console.log(error));
};

// DELETE ROUTINE
export const deleteRoutine = id => dispatch => {
  axios
    .delete(`/api/routines/${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_ROUTINE,
        payload: id
      });
    })
    .catch(error => console.log(error));
};

// ADD ROUTINE
export const addRoutine = routine => dispatch => {
  axios
    .post("/api/routines/", routine)
    .then(response => {
      dispatch({
        type: ADD_ROUTINE,
        payload: response.data
      });
    })
    .catch(error => console.log(error));
};

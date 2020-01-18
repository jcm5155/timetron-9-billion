import axios from "axios";
import { GET_ROUTINES, DELETE_ROUTINE, ADD_ROUTINE } from "./types";
import { createMessage, returnErrors } from "./messages";

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
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
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
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
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
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

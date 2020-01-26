import axios from "axios";
import {
  GET_ROUTINES,
  DELETE_ROUTINE,
  ADD_ROUTINE,
  SET_CURRENT_ROUTINE,
  UPDATE_ROUTINE,
  SET_ORDER
} from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// GET ROUTINES
export const getRoutines = () => (dispatch, getState) => {
  axios
    .get("/api/routines/", tokenConfig(getState))
    .then(response => {
      dispatch({
        type: GET_ROUTINES,
        payload: response.data
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// DELETE ROUTINE
export const deleteRoutine = id => (dispatch, getState) => {
  axios
    .delete(`/api/routines/${id}/`, tokenConfig(getState))
    .then(response => {
      dispatch(createMessage({ routineDelete: "Routine Deleted" }));
      dispatch({
        type: DELETE_ROUTINE,
        payload: id
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// ADD ROUTINE
export const addRoutine = routine => (dispatch, getState) => {
  axios
    .post("/api/routines/", routine, tokenConfig(getState))
    .then(response => {
      dispatch(createMessage({ routineAdd: "Routine Added" }));
      dispatch({
        type: ADD_ROUTINE,
        payload: response.data
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// UPDATE ROUTINE
export const updateRoutine = routine => async (dispatch, getState) => {
  axios
    .put(`/api/routines/${routine.id}/`, routine, tokenConfig(getState))
    .then(response => {
      dispatch(createMessage({ routineAdd: "Routine Updated" }));
      dispatch({
        type: UPDATE_ROUTINE,
        payload: response.data
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// SET CURRENT ROUTINE
export const setCurrentRoutine = id => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/routines/${id}`, tokenConfig(getState));
    dispatch({
      type: SET_CURRENT_ROUTINE,
      payload: response.data
    });
  } catch (error) {
    return dispatch(returnErrors(error.response.data, error.response.status));
  }
};

// SET CURRENT SEGMENT ORDER
export const setOrder = id => async (dispatch, getState) => {};

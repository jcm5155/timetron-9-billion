import axios from "axios";
import {
  GET_ROUTINES,
  DELETE_ROUTINE,
  ADD_ROUTINE,
  SET_CURRENT_ROUTINE,
  UPDATE_ROUTINE,
  TOGGLE_TIMER
} from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// Get time routines for the current user
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

// Delete the current routine
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

// Add a new routine
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

// Update current routine
export const updateRoutine = routine => async (dispatch, getState) => {
  axios
    .put(`/api/routines/${routine.id}/`, routine, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: UPDATE_ROUTINE,
        payload: response.data
      });
    })
    .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// Set routine as the current routine
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

// Toggle application state boolean for whether the routine timer is running or not.
// This exists so that I can disable dragging/rearrangement of segments while a timer is running.
// I will eventually eliminate the component state boolean in favor the application state boolean.
export const toggleTimer = trueOrFalseBool => dispatch => {
  dispatch({
    type: TOGGLE_TIMER,
    payload: trueOrFalseBool
  });
};

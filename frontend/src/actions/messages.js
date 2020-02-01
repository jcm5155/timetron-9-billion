import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// Message creation for alerts
export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  };
};

// Error creation for alerts
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
};

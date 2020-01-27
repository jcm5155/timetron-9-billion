import { combineReducers } from "redux";
import routines from "./routines";
import segments from "./segments";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import stopwatch from "./stopwatch";

export default combineReducers({
  auth,
  errors,
  messages,
  routines,
  segments,
  stopwatch
});

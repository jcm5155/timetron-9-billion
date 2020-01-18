import { combineReducers } from "redux";
import routines from "./routines";
import segments from "./segments";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  routines,
  segments,
  errors,
  messages,
  auth
});

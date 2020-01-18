import { combineReducers } from "redux";
import routines from "./routines";
import segments from "./segments";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  routines,
  segments,
  errors,
  messages
});

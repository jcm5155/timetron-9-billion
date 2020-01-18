import { combineReducers } from "redux";
import routines from "./routines";
import segments from "./segments";

export default combineReducers({
  routines,
  segments
});

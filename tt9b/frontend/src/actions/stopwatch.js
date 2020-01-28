import { SET_SPLIT, CLEAR_SPLITS } from "./types";

// Creates a new time split
export const setSplit = timeStamp => ({
  type: SET_SPLIT,
  payload: timeStamp
});

// Clears all splits in the application state
export const clearSplits = () => ({
  type: CLEAR_SPLITS
});

import { SET_SPLIT, CLEAR_SPLITS } from "./types";

// SET SPLIT
export const setSplit = timeStamp => ({
  type: SET_SPLIT,
  payload: timeStamp
});

// CLEAR SPLITS
export const clearSplits = () => ({
  type: CLEAR_SPLITS
});

import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";
import { jobsReducer } from "./jobs";

export const reducers = combineReducers({
  usersState: usersReducer,
  jobsState: jobsReducer,
});

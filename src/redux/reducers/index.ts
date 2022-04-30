import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";
import { jobsReducer } from "./jobs";

<<<<<<< Updated upstream
export const reducers = combineReducers<StoreState>({
  users: usersReducer,
=======
export const reducers = combineReducers({
  usersState: usersReducer,
  jobsState: jobsReducer,
>>>>>>> Stashed changes
});

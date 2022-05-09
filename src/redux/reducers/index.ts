import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";
import { jobsReducer } from "./jobs";
import {salaryReducer} from "./salary"

export const reducers = combineReducers({
  usersState: usersReducer,
  jobsState: jobsReducer,
  salaryState: salaryReducer,
});

/*export interface StoreState {
  users: User[];
  user: User;
}
*/

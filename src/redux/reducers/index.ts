import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";
import { jobsReducer } from "./jobs";
import { employeeReducer } from "./employee";

export const reducers = combineReducers({
  usersState: usersReducer,
  jobsState: jobsReducer,
  employeeState: employeeReducer,
});

/*export interface StoreState {
  users: User[];
  user: User;
}
*/

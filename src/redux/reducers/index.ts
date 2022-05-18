import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";
import { jobsReducer } from "./jobs";
import { employeeReducer } from "./employee";
import { salaryReducer } from "./salary";
import { authReducer } from "./auth";
import {ghostReducer} from "./ghost"

export const reducers = combineReducers({
  usersState: usersReducer,
  jobsState: jobsReducer,
  employeeState: employeeReducer,
  salaryState: salaryReducer,
  authState: authReducer,
  ghostState: ghostReducer,
});

/*export interface StoreState {
  users: User[];
  user: User;
}
*/

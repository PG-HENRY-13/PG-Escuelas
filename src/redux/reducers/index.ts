import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";
import { jobsReducer } from "./jobs";
import { employeeReducer } from "./employee";
import { salaryReducer } from "./salary";

export const reducers = combineReducers({
  usersState: usersReducer,
  jobsState: jobsReducer,
  employeeState: employeeReducer,
  salaryState: salaryReducer,
});

/*export interface StoreState {
  users: User[];
  user: User;
}
*/

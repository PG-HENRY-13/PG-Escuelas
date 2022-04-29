import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";

export const reducers = combineReducers({
  usersState: usersReducer,
});

/*export interface StoreState {
  users: User[];
  user: User;
}
*/

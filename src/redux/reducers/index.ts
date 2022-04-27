import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { StoreState } from "../interfaces";

export const reducers = combineReducers<StoreState>({
  users: usersReducer,
});

import { ActionTypes } from "./actions/types";

export interface StoreState {
  users: User[];
}

export interface User {
  id: number;
  name: string;
  lastName: string;
}

export interface FetchUsersAction {
  type: ActionTypes.fetchUsers;
  payload: User[];
}

export interface DeleteUsersAction {
  type: ActionTypes.deleteUsers;
  payload: number;
}

export interface newUser {
  cuil: string;
  name: string;
  lastName: string;
  password: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  gender: string;
  role: string;
}

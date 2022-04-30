import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
  FilterUsersAction,
} from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
  filterUsers,
}

export type Action =
  | FetchUsersAction
  | DeleteUsersAction
  | CreateUserAction
  | FilterUsersAction;

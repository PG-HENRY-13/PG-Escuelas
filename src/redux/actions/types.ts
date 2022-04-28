import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
} from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
}

export type Action = FetchUsersAction | DeleteUsersAction | CreateUserAction;

import { DeleteUsersAction, FetchUsersAction, User } from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
}

export type Action = FetchUsersAction | DeleteUsersAction;

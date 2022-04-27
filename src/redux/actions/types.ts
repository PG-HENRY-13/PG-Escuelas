import { DeleteUsersAction, FetchUsersAction, newUser } from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
}

export type Action = FetchUsersAction | DeleteUsersAction;

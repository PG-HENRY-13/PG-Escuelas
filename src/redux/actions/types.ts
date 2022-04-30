import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
  AssignJobToUserAction,
  FetchJobsAction,
  LoadUserAction,
} from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
  assignJobToUser,
  fetchJobs,
  loadUser,
}

export type Action =
  | FetchUsersAction
  | DeleteUsersAction
  | CreateUserAction
  | AssignJobToUserAction
  | FetchJobsAction
  | LoadUserAction;

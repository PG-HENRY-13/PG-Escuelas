import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
  AssignJobToUserAction,
  FetchJobsAction,
} from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
  assignJobToUser,
  fetchJobs,
}

export type Action =
  | FetchUsersAction
  | DeleteUsersAction
  | CreateUserAction
  | AssignJobToUserAction
  | FetchJobsAction;

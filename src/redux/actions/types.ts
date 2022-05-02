import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
  AssignJobToUserAction,
  FetchJobsAction,
  FilterUsersAction,
} from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
  assignJobToUser,
  fetchJobs,
  filterUsers,
}

export type Action =
  | FetchUsersAction
  | DeleteUsersAction
  | CreateUserAction
  | AssignJobToUserAction
  | FetchJobsAction
  | FilterUsersAction;

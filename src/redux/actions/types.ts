import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
  AssignJobToUserAction,
  FetchJobsAction,
  LoadUserAction,
  UpdateUserAction,
  FetchUserAction,
  FetchUserJobs,
} from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  fetchUser,
  deleteUsers,
  createUser,
  assignJobToUser,
  fetchJobs,
  loadUser,
  updateUser,
  fetchUserJobs,
}

export type Action =
  | FetchUsersAction
  | FetchUserAction
  | DeleteUsersAction
  | CreateUserAction
  | AssignJobToUserAction
  | FetchJobsAction
  | LoadUserAction
  | UpdateUserAction
  | FetchUserJobs;

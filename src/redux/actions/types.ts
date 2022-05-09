import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
  AssignJobToUserAction,
  FetchJobsAction,
  LoadUserAction,
  UpdateUserAction,
  FetchUserAction,
  UpdateFormUserAction,
  FilterRolesAction,
  FilterJobsAction,
  FetchContingenciesAction,
  DeleteContingencyAction,
  LoadUserSalaryAction,
} from "../interfaces";

export enum ActionTypes {
  fetchUsers,
  fetchUser,
  deleteUsers,
  createUser,
  assignJobToUser,
  fetchJobs,
  filterUsers,
  loadUser,
  updateUser,
  filterRoles,
  updateFormUser,
  fetchUserJobs,
  filterJobs,
  fetchContingencies,
  deleteContingency,
  loadUserSalary,
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
  | FilterRolesAction
  | UpdateFormUserAction
  | FilterRolesAction
  | FilterJobsAction
  | FetchContingenciesAction
  | DeleteContingencyAction
  | LoadUserSalaryAction;

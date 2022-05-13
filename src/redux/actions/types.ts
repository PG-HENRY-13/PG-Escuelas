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
  SaveUsersFromExcelFileAction,
  FetchContingenciesAction,
  DeleteContingencyAction,
  LoadUserSalaryAction,
  SignInAction,
  LoadUserAuthAction,
  SignOutAction,
  ExportGobExcelToCalculatorAction,
  CalculateAllWagesAction,
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
  saveUsersFromExcelFile,
  fetchContingencies,
  deleteContingency,
  loadUserSalary,
  signIn,
  loadUserAuth,
  signOut,
  exportGobExcelToCalculator,
  calculateAllWages,
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
  | SaveUsersFromExcelFileAction
  | FetchContingenciesAction
  | DeleteContingencyAction
  | LoadUserSalaryAction
  | SignInAction
  | LoadUserAuthAction
  | SignOutAction
  | ExportGobExcelToCalculatorAction
  | CalculateAllWagesAction;

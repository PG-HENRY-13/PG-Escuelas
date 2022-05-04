import { ActionTypes } from "./actions/types";

export interface StoreState {
  users: User[];
  user: User;
}

export interface User {
  cuil: string;
  name: string;
  lastName: string;
  password: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  seniorityDate: string;
  gender: string;
  role: string;
}
export interface JobAssing {
  cuil: string;
  name: string;
}

export interface UserForm {
  cuil: string;
  name: string;
  lastName: string;
  password: string;
  password2: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  seniorityDate: string;
  gender: string;
  role: string;
}

export interface FetchUsersAction {
  type: ActionTypes.fetchUsers;
  payload: User[];
}

export interface DeleteUsersAction {
  type: ActionTypes.deleteUsers;
  payload: number;
}

export interface CreateUserAction {
  type: ActionTypes.createUser;
  payload: User;
}

export interface AssignJobToUserAction {
  type: ActionTypes.assignJobToUser;
  payload: User;
}

export interface UpdateUserAction {
  type: ActionTypes.updateUser;
  payload: User;
}
export interface FetchUserAction {
  type: ActionTypes.fetchUser;
  payload: User;
}

export interface FilterRolesAction {
  type: ActionTypes.filterRoles;
  payload: User[];
}

////// JOB INTERFACES
export interface JobsStoreState {
  jobs: Job[];
  userJobs: Job[];
}

export interface Job {
  id: string;
  name: string;
}

export interface FetchJobsAction {
  type: ActionTypes.fetchJobs;
  payload: Job[];
}

export interface FetchUserJobs {
  type: ActionTypes.fetchUserJobs;
  payload: Job[];
}

export interface LoadUserAction {
  type: ActionTypes.loadUser;
  payload: User;
}

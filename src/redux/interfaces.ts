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

////// JOB INTERFACES
export interface JobsStoreState {
  jobs: Job[];
}

export interface Job {
  id: string;
  name: string;
}

export interface FetchJobsAction {
  type: ActionTypes.fetchJobs;
  payload: Job[];
}

export interface FilterUsersAction {
  type: ActionTypes.filterUsers;
  payload: User[];
}

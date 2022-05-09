import { ActionTypes } from "./actions/types";

export interface StoreState {
  users: User[];
  user: User;
  userForm: UserForm;
  contingencies: Contingency[] | [];
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

export interface EmployeeState {
  loggedUser: UserForm;
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
  jobs: Job[];
}

export interface JobAssing {
  cuil: string;
  name: string;
  removableJobs: boolean;
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
  payload: UserForm;
}

export interface AssignJobToUserAction {
  type: ActionTypes.assignJobToUser;
  payload: User;
}

export interface UpdateUserAction {
  type: ActionTypes.updateUser;
  payload: User;
}

export interface UpdateFormUserAction {
  type: ActionTypes.updateFormUser;
  payload: UserForm;
}

export interface FetchUserAction {
  type: ActionTypes.fetchUser;
  payload: User;
}

export interface FilterRolesAction {
  type: ActionTypes.filterRoles;
  payload: User[];
}

export interface FilterJobsAction {
  type: ActionTypes.filterJobs;
  payload: User[];
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

export interface LoadUserAction {
  type: ActionTypes.loadUser;
  payload: UserForm;
}

// employee interfaces

export interface Contingency {
  id?: number;
  hasNotice: boolean;
  contingencyType: ContingencyType;
  reason?: string;
  date: string;
  endDate?: string;
  hoursNumber?: number;
}

export interface AbsenceContingency extends Contingency {
  substitute?: string;
}

export interface ScheduleContingency extends Contingency {
  startingHour: string;
  endingHour: string;
  implies: string;
  askedBy: string;
  days?: string;
}

export enum ContingencyType {
  Absence = "ausencia",
  overtime = "horas extras",
  lateArrival = "llegada tarde",
  earlyWithdrawal = "retiro temprano",
}

export interface FetchContingenciesAction {
  type: ActionTypes.fetchContingencies;
  payload: Contingency[];
}

export interface DeleteContingencyAction {
  type: ActionTypes.deleteContingency;
  payload: number;
}
export interface Salary {
  basic_salary: number;
  remunerative: number;
  no_remunerative: number;
  deductions: number;
  antiquity: number;
  totalSalary: number;
}

export interface SalaryStoreState {
  salary: Salary;
  userFormSalary: UserFormSalary;
}

export interface UserFormSalary {
  basic_salary: number;
  remunerative: number;
  no_remunerative: number;
  deductions: number;
  antiquity: number;
  totalSalary: number;
  jobs: Job[];
}

export interface LoadUserSalaryAction {
  type: ActionTypes.loadUserSalary;
  payload: UserFormSalary;
}

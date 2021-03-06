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
  setDisabled: any;
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

export interface SaveUsersFromExcelFileAction {
  type: ActionTypes.saveUsersFromExcelFile;
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
  cuil?: string;
  jobId?: string;
  fullName?: string;
  userJob?: {
    UserCuil: string;
    JobId: string;
    userData: {
      name: string;
      lastName: string;
    };
    jobData: {
      name: string;
    };
  };
}

export interface UserJobCont {
  UserCuil: string;
  JobId: string;
  userData: {
    name: string;
    lastName: string;
  };
  jobData: {
    name: string;
  };
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

export enum ContingencyState {
  pending = "Pendiente",
  accepted = "Atendida",
  rejected = "Rechazada",
  discarded = "Descartada",
}

export interface FetchContingenciesAction {
  type: ActionTypes.fetchContingencies;
  payload: Contingency[];
}

export interface FetchUserContingenciesAction {
  type: ActionTypes.fetchUserContingencies;
  payload: Contingency[];
}

export interface DeleteContingencyAction {
  type: ActionTypes.deleteContingency;
  payload: number;
}

export interface HandleContingencyAction {
  type: ActionTypes.handleContingency;
  payload: {
    id: number;
    resolve: ContingencyState;
  };
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
  paychecks: Paycheck[];
  paychecksByCuil: any[];
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

// Auth interfaces

export interface AuthStateInterface {
  token: any;
  name: string;
  lastName: string;
  id: string;
  role: string;
  email: string;
  loginStatus: string;
  loginError: string;
  userLoded: boolean;
}

export interface SignInAction {
  type: ActionTypes.signIn;
  payload: any;
}

export interface LoadUserAuthAction {
  type: ActionTypes.loadUserAuth;
  payload: any;
}
export interface SignOutAction {
  type: ActionTypes.signOut;
  payload: any;
}

// Paycheck Interface

export interface Paycheck {
  jobId: string;
  userCuil: string;
  period: string;
  jobName: string;
  baseWage$: number;
  additionals$: number;
  seniority$: number;
  overTimeAdditionals$: number;
  absencesDeductions$: number;
  underTimeDeductions$: number;
  unionDeductions$: number;
  baseWageCode: number;
  underTimeDeductionsCode: number;
  absencesDeductionsCode: number;
}

export interface FetchAllPaychecksAction {
  type: ActionTypes.fetchAllPaychecks;
  payload: Paycheck[];
}

export interface FetchPaychecksByCuilAction {
  type: ActionTypes.fetchPaychecksByCuil;
  payload: Paycheck[];
}

export interface ExportGobExcelToCalculatorAction {
  type: ActionTypes.exportGobExcelToCalculator;
  payload: UserForm;
}

export interface CalculateAllWagesAction {
  type: ActionTypes.calculateAllWages;
  payload: UserForm;
}

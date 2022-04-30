<<<<<<< Updated upstream
import { DeleteUsersAction, FetchUsersAction, User } from "../interfaces";
=======
import {
  CreateUserAction,
  DeleteUsersAction,
  FetchUsersAction,
  AssignJobToUserAction,
  FetchJobsAction,
} from "../interfaces";
>>>>>>> Stashed changes

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  createUser,
<<<<<<< Updated upstream
}

export type Action = FetchUsersAction | DeleteUsersAction;
=======
  assignJobToUser,
  fetchJobs,
}

export type Action =
  | FetchUsersAction
  | DeleteUsersAction
  | CreateUserAction
  | AssignJobToUserAction
  | FetchJobsAction;
>>>>>>> Stashed changes

import { DeleteUsersAction, FetchUsersAction } from "../interfaces";


export enum ActionTypes {
    fetchUsers,
    deleteUsers
  }
  
  export type Action = FetchUsersAction | DeleteUsersAction;
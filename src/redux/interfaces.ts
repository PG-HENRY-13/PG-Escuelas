import { ActionTypes } from "./actions/types";

export interface StoreState {
	users: User[];
}

export interface User {
    id: number;
    name: string;
    lastName: string;
}

export interface FetchUsersAction {
    type: ActionTypes.fetchUsers;
    payload: User[];
}

export interface DeleteUsersAction {
    type: ActionTypes.deleteUsers;
    payload: number;
}
import { ActionTypes } from './actions/types';

export interface StoreState {
	users: any;
}

export interface UsersState{
	users: User[],
	user: User
} 

export interface User {
	cuil: string;
	name: string;
	lastName: string;
	password: string;
	address: string;
	phoneNumber: string;
	emailAddress: string;
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

import { Action, ActionTypes } from '../actions/types';
import { StoreState, User, UsersState } from '../interfaces';

// const initialState = {
//     users: [],
//     user: {
//         cuil: '',
//         name: '',
//         lastName: '',
//         password: '',
//         address: '',
//         phoneNumber: '',
//         emailAddress: '',
//         gender: '',
//         role: ''
//     }
// }

export const usersReducer = (
	state: User[] = [],
	action: Action
) => {
	switch (action.type) {
		case ActionTypes.fetchUsers:
			return action.payload;

		case ActionTypes.deleteUsers:
			return state.filter((user) => parseInt(user.cuil) !== action.payload);

		default:
			return state;
	}
};

import { Action, ActionTypes } from '../actions/types';
import { User } from '../interfaces';



export const usersReducer = (
    state: User[] = [],
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.fetchUsers:
            return action.payload;

        case ActionTypes.deleteUsers:
            return state.filter(user => parseInt(user.cuil) !== action.payload);

        default:
            return state;
    }
};
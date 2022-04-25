import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { DeleteUsersAction, FetchUsersAction, User } from '../interfaces';

const url = 'http://localhost:3001/api/user';


export const fetchUsers = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<User[]>(url);
        dispatch<FetchUsersAction>({
            type: ActionTypes.fetchUsers,
            payload: response.data,
        });
    };
};

export const deleteUsers = (userID: number) => {
    try {
        return async (dispatch: Dispatch) => {
            const response = await axios.delete<true>(url, {
                data: {
                    userID: userID
                }
            });
            if (response) {
                dispatch<DeleteUsersAction>({
                    type: ActionTypes.deleteUsers,
                    payload: userID,
                });
            }
        }
    // eslint-disable-next-line
    } catch (error: any) {
        alert("Something went wrong. Try again"); return error
    };
};
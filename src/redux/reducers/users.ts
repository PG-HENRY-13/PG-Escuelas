import { Action, ActionTypes } from "../actions/types";
import { StoreState, User } from "../interfaces";

const initialState: StoreState = {
  users: [],
  user: {
    cuil: "",
    name: "",
    lastName: "",
    password: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    seniorityDate: "",
    gender: "",
    role: "",
  },
};

export const usersReducer = (
  state: StoreState = initialState,
  action: Action
): StoreState => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return { ...state, users: action.payload };

    case ActionTypes.deleteUsers:
      return {
        ...state,
        users: state.users.filter(
          (user) => parseInt(user.cuil) !== action.payload
        ),
      };
    case ActionTypes.filterUsers:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

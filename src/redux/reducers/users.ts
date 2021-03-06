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
  userForm: {
    cuil: "",
    name: "",
    lastName: "",
    password: "",
    password2: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    seniorityDate: "",
    gender: "",
    role: "",
    jobs: [],
  },
  contingencies: [],
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

    case ActionTypes.loadUser:
      return { ...state, userForm: action.payload };
    case ActionTypes.createUser:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.updateUser:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.fetchUser:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.filterRoles:
      return {
        ...state,
        users: action.payload,
      };
    case ActionTypes.updateFormUser:
      return {
        ...state,
        userForm: action.payload,
      };
    case ActionTypes.filterJobs:
      return {
        ...state,
        users: action.payload,
      };
    case ActionTypes.fetchContingencies:
      return {
        ...state,
        contingencies: action.payload,
      };
    case ActionTypes.fetchUserContingencies:
      return {
        ...state,
        contingencies: action.payload,
      };
    case ActionTypes.deleteContingency:
      return {
        ...state,
        contingencies: state.contingencies.filter(
          (el) => el.id !== action.payload
        ),
      };

    case ActionTypes.handleContingency:
      return {
        ...state,
        contingencies: state.contingencies.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, state: action.payload.resolve };
          }
          return el;
        }),
      };

    default:
      return state;
  }
};

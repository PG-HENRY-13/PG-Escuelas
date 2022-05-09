import { Action, ActionTypes } from "../actions/types";
import { EmployeeState, User } from "../interfaces";

const initialState: EmployeeState = {
  loggedUser: {
    cuil: "230422752819",
    name: "Carlos Salvador",
    lastName: "Bilardo",
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
};

export const employeeReducer = (
  state: EmployeeState = initialState,
  action: Action
): EmployeeState => {
  switch (action.type) {
    default:
      return state;
  }
};

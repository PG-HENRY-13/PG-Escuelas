import { Action, ActionTypes } from "../actions/types";
import { SalaryStoreState, Salary } from "../interfaces";

const initialState: SalaryStoreState = {
  salary: {
    basic_salary: 0,
    remunerative: 0,
    no_remunerative: 0,
    deductions: 0,
    antiquity: 0,
    totalSalary: 0,
  },
  userFormSalary: {
    basic_salary: 0,
    remunerative: 0,
    no_remunerative: 0,
    deductions: 0,
    antiquity: 0,
    totalSalary: 0,
    jobs: [],
  },
};


export const salaryReducer = (
    state: SalaryStoreState = initialState,
    action: Action
  ): SalaryStoreState => {
    switch (action.type) {
      
      case ActionTypes.loadUserSalary:
        return { ...state, userFormSalary: action.payload };
     
      
      default:
        return state;
    }
  };
import { Action, ActionTypes } from "../actions/types";
import { JobsStoreState, Job } from "../interfaces";

const initialState: JobsStoreState = {
  jobs: [{ id: "1012", name: "profe" }],
};

export const jobsReducer = (
  state: JobsStoreState = initialState,
  action: Action
): JobsStoreState => {
  switch (action.type) {
    case ActionTypes.assignJobToUser:
      return { ...state };

    case ActionTypes.fetchJobs:
      return { ...state, jobs: action.payload };

    default:
      return state;
  }
};

import { Action, ActionTypes } from "../actions/types";
import { JobsStoreState, Job } from "../interfaces";

const initialState: JobsStoreState = {
  jobs: [
    { id: "1012", name: "profe" },
    { id: "1013", name: "profe inicial" },
    { id: "1014", name: "profe primario" },
    { id: "1015", name: "profe secundario" },
    { id: "1016", name: "profe ingles" },
    { id: "1017", name: "profe matematicas" },
    { id: "1018", name: "profe asistente" },
    { id: "2012", name: "profe suplente" },
    { id: "3012", name: "profe gimnasia" },
  ],
  userJobs: [],
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

    case ActionTypes.fetchUserJobs:
      return { ...state, userJobs: action.payload };
    default:
      return state;
  }
};

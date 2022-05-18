import { Action, ActionTypes } from "../actions/types";
import { GhostState } from "../interfaces";

const initialState: GhostState = {
  value: true,
};

export const ghostReducer = (
  state: GhostState = initialState,
  action: Action
): GhostState => {
  switch (action.type) {

    case ActionTypes.getGhostState:
        return { ...state, value: action.payload };


    default:
      return state;
  }
};
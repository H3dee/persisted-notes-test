import { Action } from "../../interfaces/IAction";
import { INCREMENT_SKIP_VALUE } from "../actionTypes";

interface InitialPaginationState {
  skipValue: number;
}

const initialState: InitialPaginationState = {
  skipValue: 0,
};

export const paginationReducer = (
  state: InitialPaginationState = initialState,
  action: Action
): InitialPaginationState => {
  switch (action.type) {
    case INCREMENT_SKIP_VALUE:
      return {
        ...state,
        skipValue: state.skipValue + 1,
      };
    default:
      return state;
  }
};

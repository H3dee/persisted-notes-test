import { Action } from "../../interfaces/IAction";
import { HIDE_LOADING, SHOW_LOADING } from "../actionTypes";

interface InitialAppState {
  loading: boolean;
}

const initialState = {
  loading: false,
};

export const appReducer = (
  state: InitialAppState = initialState,
  action: Action
): InitialAppState => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        loading: true,
      };
    case HIDE_LOADING:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

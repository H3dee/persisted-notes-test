import { Action } from "../interfaces/IAction";
import { HIDE_LOADING, SHOW_LOADING } from "./actionTypes";

export const showLoading = (): Action => ({
  type: SHOW_LOADING,
});

export const hideLoading = (): Action => ({
  type: HIDE_LOADING,
});

import { Action } from "../interfaces/IAction";
import { INCREMENT_SKIP_VALUE } from "./actionTypes";

export const incrementSkipValue = (): Action => ({
      type: INCREMENT_SKIP_VALUE
})
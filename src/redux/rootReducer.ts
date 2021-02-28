import { combineReducers } from "redux";
import { appReducer } from "./application/reducers/appReducer";
import { noteReducer } from "./Note/reducers/noteReducer";
import { paginationReducer } from "./pagination/reducers/paginationReducer";

export const rootReducer = combineReducers({
  note: noteReducer,
  app: appReducer,
  pagination: paginationReducer,
});

import { paginationReducer } from './pagination/reducers/paginationReducer';
import { combineReducers } from 'redux';
import { noteReducer } from './Note/reducers/noteReducer';
import { formReducer } from './form/reducers/formReducers';
import { appReducer } from './application/reducers/appReducer';

export const rootReducer = combineReducers({
    note: noteReducer,
    app: appReducer,
    pagination: paginationReducer,
    form: formReducer,
});

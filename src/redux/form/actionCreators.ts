import { Action } from '../interfaces/IAction';
import { cleanupNotes, fetchNotes } from '../Note/actionCreators';
import { AppThunk } from '../store';
import { SET_FILTER_BY_CONTENT } from './actionTypes';

interface SetFormAction {
    payload: string;
}

export type FormAction = SetFormAction & Action;

export const setFilterByContent = (content: string): AppThunk => (dispatch) => {
    dispatch(cleanupNotes());
    dispatch({
        type: SET_FILTER_BY_CONTENT,
        payload: content,
    });
    dispatch(fetchNotes());
};

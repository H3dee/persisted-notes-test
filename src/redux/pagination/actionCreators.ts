import { fetchNotes } from '../Note/actionCreators';
import { AppThunk } from '../store';
import { INCREMENT_SKIP_VALUE } from './actionTypes';

export const incrementSkipValue = (): AppThunk => (dispatch, getState) => {
    dispatch({
        type: INCREMENT_SKIP_VALUE,
    });

    dispatch(fetchNotes());
};

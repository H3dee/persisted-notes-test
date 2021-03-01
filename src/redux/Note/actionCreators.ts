import axios from 'axios';
import { NoteDTO, NoteProps as Note } from '../../interfaces/INote';
import { AppThunk } from '../store';
import { Action } from '../interfaces/IAction';
import {
    REMOVE_FROM_BOOKMARKS,
    ADD_TO_BOOKMARKS,
    FETCH_NOTES,
    CLEANUP_NOTES,
} from './actionTypes';
import { hideLoading, showLoading } from '../application/actionCreators';
import qs from 'qs';

type SetNoteAction = {
    payload: Note[] | number;
};

export type NoteAction = SetNoteAction & Action;

export const fetchNotes = (): AppThunk => async (dispatch, getState) => {
    const { skipValue } = getState().pagination;
    const { searchValue } = getState().form;
    const queryConfig: any = {
        _limit: 2,
        _start: skipValue * 2,
    };

    if (searchValue) {
        queryConfig['title'] = searchValue;
    }

    const query = qs.stringify(queryConfig);

    dispatch(showLoading());
    axios
        .get<NoteDTO[]>(`https://jsonplaceholder.typicode.com/photos?${query}`)
        .then((res) => {
            res.data &&
                Array.isArray(res.data) &&
                res.data.length &&
                dispatch({
                    type: FETCH_NOTES,
                    payload: res.data.map((note) => ({
                        id: note.id,
                        title: note.title,
                        isBookmarked: false,
                        imageUrl: note.thumbnailUrl,
                    })),
                });
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(hideLoading()));
};

export const cleanupNotes = (): Action => ({
    type: CLEANUP_NOTES,
});

export const addToBookmarks = (id: number): NoteAction => ({
    type: ADD_TO_BOOKMARKS,
    payload: id,
});

export const removeFromBookmarks = (id: number): NoteAction => ({
    type: REMOVE_FROM_BOOKMARKS,
    payload: id,
});

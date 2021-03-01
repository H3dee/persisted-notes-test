import { NoteProps as Note } from '../../../interfaces/INote';
import { NoteAction } from '../actionCreators';
import {
    ADD_TO_BOOKMARKS,
    REMOVE_FROM_BOOKMARKS,
    FETCH_NOTES,
    CLEANUP_NOTES,
} from '../actionTypes';

export interface InitialNoteState {
    notes: Note[];
}

export const initialState: InitialNoteState = {
    notes: [],
};

export const noteReducer = (
    state: InitialNoteState = initialState,
    action: NoteAction,
): InitialNoteState => {
    switch (action.type) {
        case FETCH_NOTES:
            if (action.payload instanceof Array) {
                return {
                    ...state,
                    notes: [...state.notes, ...action.payload],
                };
            }
            return state;
        case CLEANUP_NOTES:
            return {
                ...state,
                notes: [],
            };
        case ADD_TO_BOOKMARKS:
            if (typeof action.payload === 'number') {
                return {
                    ...state,
                    notes: state.notes.map((note) => {
                        if (note.id === action.payload) {
                            note.isBookmarked = true;
                        }

                        return note;
                    }),
                };
            }
            return state;
        case REMOVE_FROM_BOOKMARKS:
            if (typeof action.payload === 'number') {
                return {
                    ...state,
                    notes: state.notes.map((note) => {
                        if (note.id === action.payload) {
                            note.isBookmarked = false;
                        }

                        return note;
                    }),
                };
            }

            return state;
        default:
            return state;
    }
};

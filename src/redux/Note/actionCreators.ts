import axios from "axios";
import { NoteDTO, NoteProps as Note } from "../../interfaces/INote";
import { AppThunk } from "../store";
import { Action } from "../interfaces/IAction";
import {
  REMOVE_FROM_BOOKMARKS,
  ADD_TO_BOOKMARKS,
  SET_NOTES,
} from "./actionTypes";
import { hideLoading, showLoading } from "../application/actionCreators";

type SetNoteAction = {
  payload: Note[] | number;
};

export type NoteAction = SetNoteAction & Action;

export const setNotes = (): AppThunk => async (dispatch, getState) => {
  const { skipValue } = getState().pagination;

  dispatch(showLoading());
  axios
    .get<NoteDTO[]>(
      `https://jsonplaceholder.typicode.com/photos?_limit=${1}&_start=${
        skipValue * 1
      }`
    )
    .then((res) => {
      res.data &&
        Array.isArray(res.data) &&
        res.data.length &&
        dispatch({
          type: SET_NOTES,
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

export const addToBookmarks = (id: number): NoteAction => ({
  type: ADD_TO_BOOKMARKS,
  payload: id,
});

export const removeFromBookmarks = (id: number): NoteAction => ({
  type: REMOVE_FROM_BOOKMARKS,
  payload: id,
});

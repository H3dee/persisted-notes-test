import React, { useCallback, useEffect, useMemo, useState } from "react";
import { incrementSkipValue } from "../../../redux/pagination/actionCreators";
import { useTypedSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { setNotes } from "../../../redux/Note/actionCreators";
import { Loader } from "../../../components(shared)/Loader/Loader";
import { Note } from "../Note/Note";
import "./styles.scss";

const tabSelectors: string[] = ["Результаты поиска", "Закладки"];

export const NotesList: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { skipValue } = useTypedSelector((state) => state.pagination);
  const { notes } = useTypedSelector((state) => state.note);
  const loading = useTypedSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const downloadBtnHandler = useCallback(() => {
    dispatch(incrementSkipValue());
    dispatch(setNotes());
  }, [dispatch]);

  const currentTabContent = useMemo(() => {
    switch (activeTab) {
      case 2:
        return (
          <div className="notes-list__body">
            <div className="body__content">
              {notes.length && notes.find((note) => note.isBookmarked) ? (
                notes
                  .filter((note) => note.isBookmarked)
                  .map((note) => (
                    <Note
                      key={note.id}
                      id={note.id}
                      imageUrl={note.imageUrl}
                      title={note.title}
                      isBookmarked={note.isBookmarked}
                    />
                  ))
              ) : (
                <div className="content__empty-placeholder">
                  There are no bookmarked notes yet...
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="notes-list__body">
            <div className="body__content">
              {notes.length &&
                notes.map((note) => (
                  <Note
                    key={note.id}
                    id={note.id}
                    imageUrl={note.imageUrl}
                    title={note.title}
                    isBookmarked={note.isBookmarked}
                  />
                ))}
            </div>
            <div className="body__download-btn" onClick={downloadBtnHandler}>
              {loading ? <Loader /> : <button>Загрузить ещё...</button>}
            </div>
          </div>
        );
    }
  }, [activeTab, loading, notes, downloadBtnHandler]);

  useEffect(() => {
    if (notes.length) {
      return;
    }

    dispatch(setNotes());
  }, [notes.length, dispatch, skipValue]);

  return (
    <div className="notes-list">
      <div className="notes-list__container">
        <div className="notes-list__tabs">
          {Array.from({ length: 2 }, (_, i) => (
            <div
              className={
                activeTab === i + 1 ? "tabs__item active" : "tabs__item"
              }
              onClick={() => setActiveTab(i + 1)}
              key={String(i)}
            >
              <button>{tabSelectors[i]}</button>
            </div>
          ))}
        </div>
        {loading && !notes.length ? (
          <div className="notes-list__loading">
            <Loader />
          </div>
        ) : (
          currentTabContent
        )}
      </div>
    </div>
  );
};

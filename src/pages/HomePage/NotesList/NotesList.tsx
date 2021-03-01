import React, { useEffect, useMemo, useState } from 'react';
import { incrementSkipValue } from '../../../redux/pagination/actionCreators';
import { useTypedSelector } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { fetchNotes } from '../../../redux/Note/actionCreators';
import { Loader } from '../../../components(shared)/Loader/Loader';
import { Note } from '../Note/Note';
import './styles.scss';

const tabSelectors: string[] = ['Результаты поиска', 'Закладки'];

export const NotesList: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1);
    const searchContent = useTypedSelector((state) => state.form.searchValue);
    const { skipValue } = useTypedSelector((state) => state.pagination);
    const loading = useTypedSelector((state) => state.app.loading);
    const { notes } = useTypedSelector((state) => state.note);
    const dispatch = useDispatch();

    const currentTabContent = useMemo(() => {
        switch (activeTab) {
            case 2:
                return (
                    <div className="notes-list__body">
                        <div className="body__content">
                            {notes.length &&
                            notes.find((note) => note.isBookmarked) ? (
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
                        {notes.length ? (
                            <>
                                <div className="body__content">
                                    {notes.map((note) => (
                                        <Note
                                            key={note.id}
                                            id={note.id}
                                            imageUrl={note.imageUrl}
                                            title={note.title}
                                            isBookmarked={note.isBookmarked}
                                        />
                                    ))}
                                </div>
                                <div
                                    className="body__download-btn"
                                    onClick={() =>
                                        dispatch(incrementSkipValue())
                                    }
                                >
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <button>Загрузить ещё...</button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="body__empty-placeholder">
                                There are no notes yet...
                            </div>
                        )}
                    </div>
                );
        }
    }, [activeTab, loading, notes, dispatch]);

    useEffect(() => {
        if (notes.length || searchContent) {
            return;
        }

        dispatch(fetchNotes());
    }, [notes.length, dispatch, skipValue, searchContent]);

    return (
        <div className="notes-list">
            <div className="notes-list__container">
                <div className="notes-list__tabs">
                    {Array.from({ length: 2 }, (_, i) => (
                        <div
                            className={
                                activeTab === i + 1
                                    ? 'tabs__item active'
                                    : 'tabs__item'
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

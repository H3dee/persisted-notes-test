import React from "react";
import { Note } from "../Note";
import './styles.scss'

export const NotesList: React.FC = () => {
  return (
    <div className="notes-list">
      <div className="notes-list__container">
        <div className="notes-list__tabs">
          <div className="tabs__item">Результаты поиска</div>
          <div className="tabs__item">Закладки</div>
        </div>
        <div className="notes-list__body">
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    </div>
  );
};

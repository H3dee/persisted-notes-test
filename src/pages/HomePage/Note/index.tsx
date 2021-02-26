import React from "react";
import './styles.scss'

export const Note: React.FC = () => {
  return (
    <div className="note">
      <div className="note__container">
        <div className="note__preview">
          <div className="preview__image">
            <img src="" alt=" " />
          </div>
          <div className="preview__title">Search result 1</div>
        </div>
        <div className="note__info">
          <div className="info__date">25.09.20</div>
          <div className="info__add-icon">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import './styles.scss'

export const SearchForm: React.FC = () => {
  return (
    <div className="search-form">
      <div className="search-form__icon">
        <img src="" alt=" " />
      </div>
      <input placeholder="Найти" type="text" />
      <div className="search-form__btn">
        <button>Найти</button>
      </div>
    </div>
  );
};

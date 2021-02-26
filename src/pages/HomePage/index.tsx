import React from "react";
import { SearchForm } from "../../components(shared)/SearchForm";
import { NotesList } from "./NotesList";
import './styles.scss'

export const HomePage: React.FC = () => {
  return (
    <div className="home-page__content">
      <div className="home-page__container">
        <SearchForm />
        <NotesList />
      </div>
    </div>
  );
};

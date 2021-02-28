import React from "react";
import activeBookmarkIcon from "../../../assets/icons/bookmark_active.svg";
import {
  addToBookmarks,
  removeFromBookmarks,
} from "../../../redux/Note/actionCreators";
import { useDispatch } from "react-redux";
import bookmarkIcon from "../../../assets/icons/bookmark.svg";
import { NoteProps } from "../../../interfaces/INote";
import itemPhoto from "../../../assets/images/blue_pic.jpg";
import "./styles.scss";

export const Note: React.FC<NoteProps> = ({
  id,
  imageUrl,
  title,
  isBookmarked,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="note">
      <div className="note__container">
        <div className="note__preview">
          <div className="preview__image">
            <img src={imageUrl || itemPhoto} alt=" " />
          </div>
          <div className="preview__title">{title}</div>
        </div>
        <div className="note__info">
          <div className="info__date">25.09.20</div>
          <div className="info__add-icon">
            <img
              onClick={() =>
                isBookmarked
                  ? dispatch(removeFromBookmarks(id))
                  : dispatch(addToBookmarks(id))
              }
              src={isBookmarked ? activeBookmarkIcon : bookmarkIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

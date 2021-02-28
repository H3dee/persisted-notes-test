import React from "react";
import './styles.scss'

export const Loader: React.FC = () => {
  return (
    <div className="Preloader__overlay">
      <div className="Preloader__spinner"></div>
    </div>
  );
};

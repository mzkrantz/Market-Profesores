import React from "react";
import RatingStars from "../RatingStars/RatingStars";
import "./PopupInfo.css"; // Agrega un archivo CSS para estilos personalizados

const PopupCommentInfo = ({ comment, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="user-info-title">Comentario</h2>
        <div className="user-info-item">
          <span className="user-info-label">Nombre:</span>
          <span className="user-info-value">{comment.nombre}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Comentario:</span>
          <span className="user-info-value">{comment.comentario}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Valoración:</span>
          <span className="user-info-value">
            <RatingStars rating={parseFloat(comment.calificacion)} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopupCommentInfo;

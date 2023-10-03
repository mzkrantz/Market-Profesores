import React from "react";
import RatingStars from "../RatingStars/RatingStars";
import "./PopupUserInfo.css"; // Agrega un archivo CSS para estilos personalizados

const PopupUserInfo = ({ user }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="user-info-title">Datos del Usuario</h2>
        <div className="user-info-item">
          <span className="user-info-label">Nombre:</span>
          <span className="user-info-value">{user.nombre}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Apellido:</span>
          <span className="user-info-value">{user.apellido}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Teléfono:</span>
          <span className="user-info-value">{user.telefono}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Correo Electrónico:</span>
          <span className="user-info-value">{user.mail}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Horario de Preferencia:</span>
          <span className="user-info-value">{user.horario}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Comentario:</span>
          <span className="user-info-value">{user.mensaje}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Valoración:</span>
          <span className="user-info-value">
            <RatingStars rating={parseFloat(user.score)} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopupUserInfo;

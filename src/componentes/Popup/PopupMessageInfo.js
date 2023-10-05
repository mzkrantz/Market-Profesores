import React from "react";
import "./PopupInfo.css"; // Agrega un archivo CSS para estilos personalizados

const PopupUserInfo = ({ user }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="user-info-title">Solicitud de Compra</h2>
        <div className="user-info-item">
          <span className="user-info-label">Nombre:</span>
          <span className="user-info-value">{user.nombre}</span>
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
          <span className="user-info-label">Mensaje:</span>
          <span className="user-info-value">{user.mensaje}</span>
        </div>
      </div>
    </div>
  );
};

export default PopupUserInfo;

import React, { useState, useEffect } from "react";

const Refresher = ({ children }) => {
  const [actualizador, setActualizador] = useState(false);

  // Función para forzar la actualización de componentes hijos
  const refrescar = () => {
    setActualizador((prev) => !prev);
  };

  // Efecto secundario para detectar cambios en el estado 'actualizador'
  useEffect(() => {
    console.log("Se ha solicitado una actualización de componentes. Puedes realizar acciones adicionales aquí.");
  }, [actualizador]);

  return (
    <>
      {children({ refrescar })}
    </>
  );
};

export default Refresher;

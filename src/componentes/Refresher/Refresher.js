import React, { useState, useEffect } from "react";

const Refresher = ({ children }) => {
  const [actualizador, setActualizador] = useState(false);

  const refrescar = () => {
    setActualizador((prev) => !prev);
  };

  useEffect(() => {
    console.log("Se ha solicitado una actualización de componentes");
  }, [actualizador]);

  return <>{children({ refrescar })}</>;
};

export default Refresher;

import React, { useState, useEffect } from "react";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
import ResponsiveGrid from "../../componentes/Grid/ResponsiveGrid";
import CardProfesor from "../../componentes/Cards/CardProfesor";
import ejemploProfesores from "../../data/ejemplo-profesores.json"; // Importar los profesores desde el archivo JSON
import SpacerTop from "../../componentes/Spacer/SpacerTop";
import { Pagination } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Profesores() {
  const [professorsData, setProfessorsData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Cantidad de profesores por página y valor predeterminado para escritorio

  useEffect(() => {
    // Usar ejemploProfesores directamente en lugar de hacer una solicitud fetch
    setProfessorsData(ejemploProfesores.profesores);
  }, []);

  useEffect(() => {
    // Funcion para actualizar el numero de elementos por pagina segun el ancho de la ventana
    const updateItemsPerPage = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 600) {
        setItemsPerPage(1); //1 elemento por pagina en dispositivos moviles
      } else if (windowWidth < 900) {
        setItemsPerPage(2); //2 elementos por pagina en tablets
      } else {
        setItemsPerPage(3); //3 elementos por pagina en escritorio
      }
    };

    // Llama a la funcion inicialmente y se actualiza segun cambios en el tamaño de la ventana
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    // Limpia el evento de cambio de tamaño cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  // Calcula el índice de inicio y fin para mostrar los profesores de la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProfessors = professorsData.slice(startIndex, endIndex);

  // Calcula la cantidad total de páginas
  const totalPages = Math.ceil(professorsData.length / itemsPerPage);

  // Maneja el cambio de página
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Breadcrumb />
      <Container maxWidth="xl">
        <SpacerTop>
          <Typography
            style={{
              margin: "0",
              padding: "1rem ",
              fontSize: "1.25rem",
              textAlign: "center",
            }}
          >
            Nuestros profesores, elegidos por su experiencia y pasión por la
            enseñanza, te brindarán una educación de calidad y te ayudarán a
            alcanzar tu máximo potencial.
          </Typography>
        </SpacerTop>

        <ResponsiveGrid
          cardComponent={CardProfesor}
          cards={currentProfessors}
        />
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px"
          }}
          boundaryCount={0}
        />
      </Container>
    </>
  );
}

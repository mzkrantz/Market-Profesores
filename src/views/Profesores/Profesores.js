import React, { useState, useEffect } from "react";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
import ResponsiveGrid from "../../componentes/Grid/ResponsiveGrid";
import CardProfesor from "../../componentes/Cards/CardProfesor";
import SpacerTop from "../../componentes/Spacer/SpacerTop";
import { Pagination } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { obtenerTodosLosProfesores } from "../../controller/miApp.controller";

export default function Profesores() {
  const [professorsData, setProfessorsData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchProfesores = async () => {
      const response = await obtenerTodosLosProfesores(page, itemsPerPage);

      if (response.rdo === 0) {
        setProfessorsData(response.data);
      } else {
        console.error(response.mensaje);
      }
    };

    fetchProfesores();
  }, [page, itemsPerPage]);

  useEffect(() => {
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

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

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
            marginBottom: "20px",
          }}
          boundaryCount={0}
        />
      </Container>
    </>
  );
}

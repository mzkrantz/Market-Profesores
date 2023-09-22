import React, { useState } from "react";
import PrimarySearchAppBar from "../../componentes/NavNarGeneral/NavBar";
import "./ProfesoresStyle.css";
import CustomSeparator from "../../componentes/Breadcrumb/Breadcrumb";
import CardProfesor from "../../componentes/Cards/CardProfesor";
import profesoresData from '../../data/profesores.json';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Profesores() {
  const { profesores } = profesoresData;

  // Establecemos la cantidad de elementos por página
  const itemsPerPage = 4; 
  const [page, setPage] = useState(1);

  // Calculamos el índice de inicio y fin para mostrar los elementos de la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <PrimarySearchAppBar />
      <CustomSeparator> Profesores </CustomSeparator>
      <div className="cardProfesores">
        {profesores && Array.isArray(profesores) && (
          <CardProfesor profesores={profesores.slice(startIndex, endIndex)} />
        )}
      </div>
      <div className="pagination-container">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(profesores.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
}

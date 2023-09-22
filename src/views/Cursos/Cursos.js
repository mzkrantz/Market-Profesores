import React, { useState, useEffect } from 'react';
import PrimarySearchAppBar from '../../componentes/NavNarGeneral/NavBar';
import CustomSeparator from '../../componentes/Breadcrumb/Breadcrumb';
import ResponsiveGrid from '../../componentes/Grid/ResponsiveGrid';
import FilterBar from '../../componentes/FilterBar/FilterBar';
import CardCurso from '../../componentes/Cards/CardCurso';
import ejemploCursos from '../../data/ejemplo-cursos.json'; // Ruta al archivo JSON
import { Pagination } from '@mui/material';

export default function Cursos() {
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Cantidad de elementos por página

  useEffect(() => {
    // Usar ejemploCursos directamente en lugar de hacer una solicitud fetch
    setCourseData(ejemploCursos.cursos);
  }, []);

  // Calcula el índice de inicio y fin para mostrar los elementos de la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courseData.slice(startIndex, endIndex);

  // Calcula la cantidad total de páginas
  const totalPages = Math.ceil(courseData.length / itemsPerPage);

  // Maneja el cambio de página
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <PrimarySearchAppBar />
      <CustomSeparator> Cursos </CustomSeparator>
      <FilterBar />
      <ResponsiveGrid cardComponent={CardCurso} cards={currentCourses} />
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px"
        }}       
      />
    </>
  );
}

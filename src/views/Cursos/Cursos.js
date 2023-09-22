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
  const [filterCategory, setFilterCategory] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const itemsPerPage = 3; // Cantidad de elementos por página

  useEffect(() => {
    // Usar ejemploCursos directamente en lugar de hacer una solicitud fetch
    setCourseData(ejemploCursos.cursos);
  }, []);

  // Calcula el índice de inicio y fin para mostrar los elementos de la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Aplicar filtros a los cursos
  const filteredCourses = courseData.filter((curso) => {
    if (filterCategory && curso.category !== filterCategory) {
      return false; // Filtrar por categoría
    }
    if (filterText && !curso.title.toLowerCase().includes(filterText.toLowerCase())) {
      return false; // Filtrar por palabra clave
    }
    if (filterDuration && curso.duration !== filterDuration) {
      return false; // Filtrar por duración
    }
    return true;
  });

  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Calcula la cantidad total de páginas
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Maneja el cambio de página
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Maneja el cambio en la categoría de filtro
  const handleCategoryChange = (selectedCategory) => {
    setFilterCategory(selectedCategory);
  };

  // Maneja el cambio en la palabra clave de filtro
  const handleTextFilter = ({ category, text, duration }) => {
    setFilterCategory(category);
    setFilterText(text);
    setFilterDuration(duration);
  };

  return (
    <>
      <PrimarySearchAppBar />
      <CustomSeparator> Cursos </CustomSeparator>

      <div style={{ marginTop: "40px" }}>
        <FilterBar onCategoryChange={handleCategoryChange} onFilter={handleTextFilter}/>
      </div>
      
      <ResponsiveGrid cardComponent={CardCurso} cards={currentCourses} />
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      />
    </>
  );
}

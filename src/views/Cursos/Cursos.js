import React, { useState, useEffect } from "react";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
import ResponsiveGrid from "../../componentes/Grid/ResponsiveGrid";
import FilterBar from "../../componentes/FilterBar/FilterBar";
import CardCurso from "../../componentes/Cards/CardCurso";
import ejemploCursos from "../../data/ejemplo-cursos.json"; // Ruta al archivo JSON
import SpacerTop from "../../componentes/Spacer/SpacerTop";
import { Pagination } from "@mui/material";
import Container from "@mui/material/Container";

export default function Cursos() {
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6); // Cantidad de cursos por pagina y valor predeterminado para escritorio

  useEffect(() => {
    // Usar ejemploCursos directamente en lugar de hacer una solicitud fetch
    setCourseData(ejemploCursos.cursos);
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
        setItemsPerPage(3); //6 elementos por pagina en escritorio
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

  // Calcula el índice de inicio y fin para mostrar los elementos de la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Aplicar filtros a los cursos
  const filteredCourses = courseData.filter((curso) => {
    if (filterCategory && curso.category !== filterCategory) {
      return false; // Filtrar por categoría
    }
    if (
      filterText &&
      !curso.title.toLowerCase().includes(filterText.toLowerCase())
    ) {
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
      <Breadcrumb />
      <Container maxWidth="xl">
        <SpacerTop>
          <FilterBar
            onCategoryChange={handleCategoryChange}
            onFilter={handleTextFilter}
          />
        </SpacerTop>

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
      </Container>
    </>
  );
}

import PrimarySearchAppBar from "../../componentes/NavNarGeneral/NavBar";
import CustomSeparator from "../../componentes/Breadcrumb/Breadcrumb";
import ResponsiveGrid from "../../componentes/Grid/ResponsiveGrid";
import FilterBar from "../../componentes/FilterBar/FilterBar";
import CardCurso from "../../componentes/Cards/CardCurso";
import React, { useState, useEffect } from 'react';
import ejemploCursos from '../../data/ejemplo-cursos.json'; // Ruta al archivo JSON


export default function Cursos() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Usar ejemploCursos directamente en lugar de hacer una solicitud fetch
    setCourseData(ejemploCursos.cursos);
  }, []);

  return (
    <>
      <PrimarySearchAppBar />
      <CustomSeparator > Cursos </CustomSeparator>  
      <FilterBar > </FilterBar> 
      <ResponsiveGrid cardComponent={CardCurso} cards={courseData} />
    </>
  );
}

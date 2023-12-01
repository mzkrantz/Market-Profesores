import React, { useState, useEffect } from "react";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
import ResponsiveGrid from "../../componentes/Grid/ResponsiveGrid";
import FilterBar from "../../componentes/FilterBar/FilterBar";
import CardCurso from "../../componentes/Cards/CardCurso";
import SpacerTop from "../../componentes/Spacer/SpacerTop";
import { Pagination, Container } from "@mui/material";
import { obtenerTodosLosCursosPublicados } from "../../controller/miApp.controller";

export default function Cursos() {
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterFrequency, setFilterFrequency] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField] = useState("stars");
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await obtenerTodosLosCursosPublicados(
        page,
        itemsPerPage
      );

      if (response.rdo === 0) {
        setCourseData(response.data);
      } else {
        console.error(response.mensaje);
      }
    };

    fetchCursos();
  }, [page, itemsPerPage]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 600) {
        setItemsPerPage(1);
      } else if (windowWidth < 900) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredCourses = courseData.filter((curso) => {
    if (filterCategory && curso.category !== filterCategory) {
      return false;
    }
    if (
      filterText &&
      !curso.title.toLowerCase().includes(filterText.toLowerCase())
    ) {
      return false;
    }
    if (filterFrequency && curso.frequency !== filterFrequency) {
      return false;
    }
    if (filterType && curso.type !== filterType) {
      return false;
    }
    return true;
  });

  const sortedCourses = filteredCourses.slice().sort((a, b) => {
    if (sortField === "stars") {
      const aStars = parseFloat(a.stars) || 0;
      const bStars = parseFloat(b.stars) || 0;
      return sortOrder === "asc" ? aStars - bStars : bStars - aStars;
    }
    return 0;
  });

  const currentCourses = sortedCourses.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleTextFilter = ({ category, text, frequency, type, sortOrder }) => {
    setFilterCategory(category);
    setFilterText(text);
    setFilterFrequency(frequency);
    setFilterType(type);
    setSortOrder(sortOrder);
  };

  const handleSortChange = (newOrder) => {
    setSortOrder(newOrder);
  };

  const clearFilters = () => {
    setFilterCategory("");
    setFilterText("");
    setFilterFrequency("");
    setFilterType("");
    setSortOrder("desc");
  };

  return (
    <>
      <Breadcrumb />
      <Container maxWidth="xl">
        <SpacerTop>
          <FilterBar
            onFilter={handleTextFilter}
            onSortChange={handleSortChange}
            onClearFilters={clearFilters}
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
            marginBottom: "20px",
          }}
          boundaryCount={0}
        />
      </Container>
    </>
  );
}

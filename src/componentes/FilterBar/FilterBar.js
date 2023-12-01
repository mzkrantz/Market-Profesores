import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./ButtonResponsive.css";

export default function FilterBar({ onFilter, onSortChange, onClearFilters }) {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [frequency, setFrequency] = useState("");
  const [type, setType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  const handleTextChange = (event) => {
    const searchText = event.target.value;
    setText(searchText);
  };

  const handleFrequencyChange = (event) => {
    const selectedFrequency = event.target.value;
    setFrequency(selectedFrequency);
  };

  const handleTypeChange = (event) => {
    const searchType = event.target.value;
    setType(searchType);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    onSortChange(newOrder);
  };

  const clearFilters = () => {
    setCategory("");
    setText("");
    setFrequency("");
    setType("");
    setSortOrder("desc");
    onClearFilters();
  };

  const handleSearch = () => {
    onFilter({ category, text, frequency, type, sortOrder });
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Agrega un Grid item de Categoria */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Categoría"
              onChange={handleCategoryChange}
            >
              <MenuItem value={""}>Todas las Categorías</MenuItem>
              <MenuItem value={"Desarrollo Web"}>Desarrollo Web</MenuItem>
              <MenuItem value={"Marketing Digital"}>Marketing Digital</MenuItem>
              <MenuItem value={"Diseño Gráfico"}>Diseño Gráfico</MenuItem>
              <MenuItem value={"Idiomas"}>Idiomas</MenuItem>
              <MenuItem value={"Fotografía"}>Fotografía</MenuItem>
              <MenuItem value={"Cocina"}>Cocina</MenuItem>
              <MenuItem value={"Negocios"}>Negocios</MenuItem>
              <MenuItem value={"Salud y Bienestar"}>Salud y Bienestar</MenuItem>
              <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Agrega un Grid item de Frecuencia */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="frequency-select-label">Frecuencia</InputLabel>
            <Select
              labelId="frequency-select-label"
              id="frequency-select"
              value={frequency}
              label="Frecuencia"
              onChange={handleFrequencyChange}
            >
              <MenuItem value={""}>Cualquier Frecuencia</MenuItem>
              <MenuItem value={"1"}>1 vez a la semana</MenuItem>
              <MenuItem value={"2"}>2 veces a la semana</MenuItem>
              <MenuItem value={"3"}>3 veces a la semana</MenuItem>
              <MenuItem value={"4"}>4 veces a la semana</MenuItem>
              <MenuItem value={"5"}>5 veces a la semana</MenuItem>
              <MenuItem value={"6"}>6 veces a la semana</MenuItem>
              <MenuItem value={"7"}>7 veces a la semana</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Agrega un Grid item de Tipo de Clase */}
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="type-select-label">Tipo de Clase</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              label="Tipo de Clase"
              onChange={handleTypeChange}
            >
              <MenuItem value={""}>Cualquiera</MenuItem>
              <MenuItem value={"Grupal"}>Grupal</MenuItem>
              <MenuItem value={"Individual"}>Individual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Agrega un Grid item de Busqueda por Texto */}
        <Grid item xs={12} sm={6} md={3} lg={6}>
          <TextField
            id="text-filter"
            label="Buscar"
            variant="outlined"
            value={text}
            onChange={handleTextChange}
            fullWidth
          />
        </Grid>

        {/* Agrega un Grid item con un boton Buscar */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="small"
              onClick={handleSearch}
              className={"fullWidthButton"}
            >
              Buscar
            </Button>
          </Box>
        </Grid>

        {/* Agrega un Grid item con un boton Limpiar Filtros */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="outlined"
              size="small"
              onClick={clearFilters}
              className={"fullWidthButton"}
            >
              Limpiar Filtros
            </Button>
          </Box>
        </Grid>

        {/* Agrega un Grid item con un boton para cambiar el orden en el que se muestran los elementos */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="outlined"
              size="small"
              onClick={toggleSortOrder}
              className={"fullWidthButton"}
            >
              {sortOrder === "asc" ? (
                <>
                  <ArrowUpwardIcon />
                  <span>Puntaje</span>
                </>
              ) : (
                <>
                  <ArrowDownwardIcon />
                  <span>Puntaje</span>
                </>
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

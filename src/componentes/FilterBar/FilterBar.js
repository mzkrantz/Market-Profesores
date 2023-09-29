import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import './ButtonBuscarResponsive.css'


export default function FilterBar({ onCategoryChange, onFilter }) {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [duration, setDuration] = useState("");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    // Llama a la función de devolución de llamada para enviar la categoría seleccionada
    onCategoryChange(selectedCategory);
  };

  const handleTextChange = (event) => {
    const searchText = event.target.value;
    setText(searchText);
  };

  const handleDurationChange = (event) => {
    const selectedDuration = event.target.value;
    setDuration(selectedDuration);
  };

  const handleSearch = () => {
    // Llama a la función de devolución de llamada para enviar la categoría, palabra clave y duración
    onFilter({ category, text, duration });
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
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

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="duration-select-label">Duración</InputLabel>
            <Select
              labelId="duration-select-label"
              id="duration-select"
              value={duration}
              label="Duración"
              onChange={handleDurationChange}
            >
              <MenuItem value={""}>Cualquier Duración</MenuItem>
              <MenuItem value={"4 semanas"}>4 semanas</MenuItem>
              <MenuItem value={"8 semanas"}>8 semanas</MenuItem>
              <MenuItem value={"12 semanas"}>12 semanas</MenuItem>
              <MenuItem value={"6 meses"}>6 meses</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="text-filter"
            label="Buscar"
            variant="outlined"
            value={text}
            onChange={handleTextChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
        <Box display="flex" justifyContent="center">
            <Button variant="contained" size="small" onClick={handleSearch} className={'fullWidthButton'}>
              Buscar
            </Button>
        </Box>
        </Grid>

      </Grid>
    </Box>
  );
}

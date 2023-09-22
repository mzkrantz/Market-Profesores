import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

export default function FilterBar() {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const handleAgeChange = (event) => {
    setCategory(event.target.value);
    // Aquí puedes realizar acciones de filtrado en función del valor seleccionado.
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    // Aquí puedes realizar acciones de filtrado en función del texto ingresado.
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
    // Aquí puedes realizar acciones de filtrado en función del estado del interruptor.
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        justifyContent: "center",
        padding: "70px",
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="simple-select-label">Categoria</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={category}
          label="Categoria"
          onChange={handleAgeChange}
        >
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

      <TextField
        id="outlined-basic"
        label="Buscar"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
      />

      <div>
        <Button variant="contained" size="small">
          Buscar
        </Button>
      </div>
    </Box>
  );
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

export default function FilterBar() {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center'}}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="simple-select-label">Categoria</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={category}
          label="Categoria"
          onChange={handleAgeChange}
        >
          <MenuItem value={'Categoria 1'}>Categoria 1</MenuItem>
          <MenuItem value={'Categoria 2'}>Categoria 2</MenuItem>
          <MenuItem value={'Categoria 3'}>Categoria 3</MenuItem>
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
        <label>Switch</label>
        <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
      </div>
    </Box>
  );
}

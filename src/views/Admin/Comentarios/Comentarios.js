// src/Comentarios.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const comentarios = [
  {
    autor: 'Usuario1',
    comentario: '¡Excelente curso!',
  },
  {
    autor: 'Usuario2',
    comentario: 'Me gustó mucho la forma en que se explica el contenido.',
  },
];

function Comentarios() {
  const [comentariosState, setComentariosState] = useState(comentarios);

  const eliminarComentario = (index) => {
    const nuevosComentarios = [...comentariosState];
    nuevosComentarios.splice(index, 1);
    setComentariosState(nuevosComentarios);
  };

  return (
    <div className='App'>
      <Typography variant="h4" gutterBottom>
        Comentarios de tus cursos
      </Typography>
      {comentariosState.map((comentario, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{comentario.autor}</Typography>
            <Typography variant="body2">{comentario.comentario}</Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => eliminarComentario(index)}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Comentarios;

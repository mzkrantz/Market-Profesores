import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function CardCurso() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="imagen-del-curso.jpg"
        alt="Curso Imagen"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          Nombre del Curso
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Descripcion corta del curso.
        </Typography>
        <Typography variant="h6" color="text.secondary" style={{ marginTop: '1rem' }}>
          Precio: $99.99
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Mas Informacion
        </Button>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function CardCurso(props) {
  const { image, title, description, duration, price, buttonLink } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="Curso Imagen"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duración: {duration}
        </Typography>
        <Typography variant="h6" color="text.secondary" style={{ marginTop: '1rem' }}>
          Precio: {price}
        </Typography>
        <Button variant="contained" color="primary" href={buttonLink} style={{ marginTop: '1rem' }}>
          Mas Informacion
        </Button>
      </CardContent>
    </Card>
  );
};

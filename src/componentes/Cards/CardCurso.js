import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CardCurso(props) {
  const {id, image, title, description, duration, price} = props;

  return (
    <Card style={{ minHeight: '26rem',  display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
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

        <Button
          variant="contained"
          color="primary"
          href={`/Cursos/CursoIndividual/${id}`}
          style={{ marginTop: '1rem' }}
        >
          Mas Información
        </Button>


      </CardContent>
    </Card>
  );
}

export default CardCurso;

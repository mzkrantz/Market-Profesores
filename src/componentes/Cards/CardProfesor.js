import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BasicModal from "../Modal/Modal";

export default function CardProfesor() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="Profesor" height="140" image="#" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Carlos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Profesor de Matematicas con 10 años de experiencia en el area de
          matematicas y fisica
        </Typography>
      </CardContent>

      <CardActions>
        <BasicModal 
        nombreBoton="Contactar"
        nombreProfesor="Carlos"
        descripcion = "disponible para clases de matematicas y fisica"
         />

        <BasicModal
          nombreBoton="Conoceme"
          nombreProfesor="Carlos"
          descripcion="Profesor de Matematicas con 10 años de experiencia en el area de matematicas y fisica"
        />
      </CardActions>
    </Card>
  );
}

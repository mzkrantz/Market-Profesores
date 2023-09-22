import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BasicModal from "../Modal/Modal";

export default function CardProfesor({ profesores }) {
  if (!profesores || !Array.isArray(profesores)) {
    return null; // Puedes mostrar un mensaje de error o carga en su lugar
  }

  return (
    <>
      {profesores.map((profesor, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia component="img" alt="Profesor" height="140" image={profesor.imagen} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {profesor.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profesor.descripcion}
            </Typography>
          </CardContent>

          <CardActions>
            <BasicModal
              nombreBoton="Contactar"
              nombreProfesor={profesor.nombre}
              descripcion={`Disponible para clases de ${profesor.materia}`}
            />

            <BasicModal
              nombreBoton="Conóceme"
              nombreProfesor={profesor.nombre}
              descripcion={profesor.descripcion}
            />
          </CardActions>
        </Card>
      ))}
    </>
  );
}

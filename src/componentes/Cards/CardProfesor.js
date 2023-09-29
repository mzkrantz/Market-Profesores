import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BasicModal from "../Modal/Modal";

export default function CardProfesor(props) {
  const { image, name, description, subject} = props;

  return (
    <Card style={{ minHeight: '26rem',  display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="Profesor Imagen"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <BasicModal
        buttonName="Contactar"
        professorName={name}
        description={`Disponible para clases de ${subject}`}
      />
      <BasicModal
        buttonName="Conóceme"
        professorName={name}
        description={description}
      />
    </Card>
  );
}
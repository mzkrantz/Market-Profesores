import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BasicModal from "../Modal/ModalProfesor";
import "./CardStyles.css";

export default function CardProfesor(props) {
  const { image, name, description, subject } = props;

  return (
    <Card
      style={{
        minHeight: "30rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardMedia
        component="img"
        className="card-image"
        src={image}
        alt="Profesor Imagen"
      />
      <CardContent>
        <div className="infoBox">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </div>
      </CardContent>
      <div className="infoBox2 ">
        <div className="modalContent">
          <BasicModal
            buttonName="Contactar"
            className="card-modal"
            professorName={name}
            description={`Disponible para clases de ${subject}`}
          />
          <BasicModal
            buttonName="Conóceme"
            className="card-modal"
            professorName={name}
            description={description}
          />
        </div>
      </div>
    </Card>
  );
}

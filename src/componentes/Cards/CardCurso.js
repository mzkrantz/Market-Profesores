import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import "./CardStyles.css";

function CardCurso(props) {
  const { _id, image, title, description, frequency, price, type, stars } =
    props;

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
        alt="Curso Imagen"
      />
      <CardContent>
        <div className="infoBox">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" gutterBottom color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" gutterBottom color="text.secondary">
            {frequency === "1"
              ? "1 vez por semana"
              : `${frequency} veces por semana`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tipo: {type}
          </Typography>
        </div>
        <div className="infoBox2">
          <RatingStars rating={parseFloat(stars)} />
          <Typography variant="h6" color="text.secondary">
            Precio: ${price}
          </Typography>

          <Link
            to={`/Cursos/CursoIndividual/${_id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Mas Información
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardCurso;

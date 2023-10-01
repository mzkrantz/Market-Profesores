import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
import cursosData from "../../data/ejemplo-cursos.json";
import profesoresData from "../../data/ejemplo-profesores.json"; // Importa los datos de profesores
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Importa ThemeProvider y createTheme
import RatingStars from "../../componentes/RatingStars/RatingStars";
import { CardMedia } from "@mui/material";
import "./CursoIndividualStyles.css";
import CommentGrid from "../../componentes/Comments/CommentGrid";
import CommentTextArea from "../../componentes/Comments/CommentTextArea";

//Mock de comentarios
const comments = [
  {
    name: "Juan Gomez",
    score: 4,
    comment: "Este es un comentario de ejemplo.",
  },
  {
    name: "Juan Juanes",
    score: 3,
    comment: "Este es un comentario de ejemplo.",
  },
  {
    name: "Juan Garcia",
    score: 5,
    comment: "Este es un comentario de ejemplo.",
  },
  { name: "Juan Cito", score: 2, comment: "Este es un comentario de ejemplo." },
  { name: "Juan Manuel", score: 5, comment: "¡Me encantó este producto!" },
];

//Creacion del tema, header e infobox
const theme = createTheme();
const HeaderImage = styled("div")({
  width: "100%",
  height: "auto",
  boxShadow: (theme) => theme.shadows[1],
});

const InfoBox = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  minHeight: "21rem",
}));

export default function CursoIndividual() {
  const { id } = useParams(); // Obtiene el id de los parámetros de la URL
  console.log("ID:", id);
  const curso = cursosData.cursos.find(
    (curso) => curso.id === parseInt(id, 10)
  ); // Busca el curso por id

  if (!curso) {
    // Manejo de caso en el que el curso no se encuentra
    return <div>Curso no encontrado</div>;
  }

  const {
    image,
    title,
    description,
    duration,
    price,
    extendedDescription,
    subjects,
    teacher,
    category,
    frequency,
    type,
  } = curso;

  // Busca al docente utilizando el ID del curso
  const docente = profesoresData.profesores.find(
    (profesor) => profesor.id === teacher
  );

  const breadcrumbItems = [
    { label: "EDUWIZARD", link: "/" },
    { label: "Cursos", link: "/Cursos" },
    { label: title, link: `/Cursos/CursoIndividual/${id}` },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Breadcrumb items={breadcrumbItems} />

        <Container maxWidth="xl">
          <Paper
            elevation={3}
            className={HeaderImage}
            style={{ minHeight: "200px", marginBottom: "1rem" }}
          >
            <img src={image} alt="Curso Imagen" width="100%" />
          </Paper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className="info-square">
              <InfoBox className="info-square">
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {description}
                  </Typography>
                  <Typography variant="body2">Duración: {duration}</Typography>
                  <Typography variant="body2">
                    {frequency === "1"
                      ? "1 vez por semana"
                      : `${frequency} veces por semana`}
                  </Typography>
                  <Typography variant="body2">Precio: {price}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                  >
                    Comprar
                  </Button>
                  <Divider style={{ padding: "2rem" }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Valoración del Curso
                  </Typography>
                  <RatingStars rating={parseFloat(curso.stars)} />
                </CardContent>
              </InfoBox>
            </Grid>

            <Grid item xs={12} sm={6} className="info-square">
              <InfoBox className="info-square">
                <CardContent>
                  <Typography variant="h5">Docente a Cargo</Typography>
                  <CardMedia
                    component="img"
                    className="card-image"
                    src={image}
                    alt="Profesor Imagen"
                    style={{ width: "100%", minHeight: "15rem" }}
                  />
                  <Typography variant="body1">
                    {docente ? docente.name : "No se encontró el docente"}
                  </Typography>
                  <Typography variant="body1">
                    {docente ? docente.background : "No se encontró el docente"}
                  </Typography>
                </CardContent>
              </InfoBox>
            </Grid>

            <Grid item xs={12} sm={6} className="info-square2">
              <InfoBox className="info-square2">
                <CardContent>
                  <Typography variant="h5">Descripción</Typography>
                  <Typography variant="body1">{extendedDescription}</Typography>
                </CardContent>

                <CardContent>
                  <Typography variant="h5">Categoria</Typography>
                  <Typography variant="body1">{category}</Typography>
                </CardContent>

                <CardContent>
                  <Typography variant="h5">Modo de Clases</Typography>
                  <Typography variant="body1">{type}</Typography>
                </CardContent>
              </InfoBox>
            </Grid>

            <Grid item xs={12} sm={6} className="info-square2">
              <InfoBox className="info-square2">
                <CardContent>
                  <Typography variant="h5">Temas del Curso</Typography>
                  <List>
                    {subjects.map((subject, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={subject} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </InfoBox>
            </Grid>

            <Grid item xs={12}>
              <InfoBox>
                <CardContent>
                  <CommentTextArea />
                  <Typography variant="h5" style={{ paddingTop: "2rem" }}>
                    Comentarios
                  </Typography>
                  <div>
                    <CommentGrid comments={comments} />
                  </div>
                </CardContent>
              </InfoBox>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

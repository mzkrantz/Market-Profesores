import React from "react";
import { useParams } from "react-router-dom";
import PrimarySearchAppBar from "../../componentes/NavBarGeneral/NavBar";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
import cursosData from "../../data/ejemplo-cursos.json";
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
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Importa ThemeProvider y createTheme

const theme = createTheme();
const HeaderImage = styled("div")({
  width: "100%",
  height: "auto",
  boxShadow: (theme) => theme.shadows[1],
});

const CourseDetails = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  minHeight: "21rem",
}));

const ExtendedDescription = styled(Card)(({ theme }) => ({
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
  } = curso;

  const breadcrumbItems = [
    { label: "EDUWIZARD", link: "/" },
    { label: "Cursos", link: "/Cursos" },
    { label: title, link: `/Cursos/CursoIndividual/${id}` },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <PrimarySearchAppBar />
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
            
            <Grid item xs={12} md={6}>
              <CourseDetails>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>{description}</Typography>
                  <Typography variant="body2" >Duración: {duration}</Typography>
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
                  <StarIcon color="warning" />  {/*!-- Muestra las estrellas de acuerdo a la valoración del curso - Fijas, ver cambiar a dinámicas*/}
                  <StarIcon color="warning" />
                  <StarIcon color="warning" />
                  <StarIcon color="warning" />
                  <StarBorderIcon color="warning" />
                </CardContent>
              </CourseDetails>
            </Grid>

            <Grid item xs={12} md={6}>
              <ExtendedDescription>
                <CardContent>
                  <Typography variant="h5">Descripción</Typography>
                  <Typography variant="body1">{extendedDescription}</Typography>
                </CardContent>
              </ExtendedDescription>
            </Grid>

            <Grid item xs={12} md={6}>
              <ExtendedDescription>
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
              </ExtendedDescription>
            </Grid>

          {/*INSERTAR PROFESOR A CARGO DEL CURSO*/}
          </Grid>
        </Container>

      </ThemeProvider>
    </>
  );
}

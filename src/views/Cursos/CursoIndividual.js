import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RatingStars from "../../componentes/RatingStars/RatingStars";
import { CardMedia } from "@mui/material";
import "./CursoIndividualStyles.css";
import CommentGrid from "../../componentes/Comments/CommentGrid";
import CommentTextArea from "../../componentes/Comments/CommentTextArea";
import CompraForm from "../../componentes/Forms/CompraForm";
import {
  obtenerTodosLosCursosPublicados,
  obtenerProfesorPorId,
  getComentariosByCursoId,
} from "../../controller/miApp.controller";

const theme = createTheme();

const HeaderImage = {
  width: "100%",
  height: "250px",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: (theme) => theme.shadows[1],
};

const ImageContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const Image = {
  width: "100%",
  height: "auto",
};

const InfoBox = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  minHeight: "21rem",
}));

const CursoIndividual = () => {
  const { id } = useParams();
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(null);
  const [profesor, setProfesor] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await obtenerTodosLosCursosPublicados();
        if (response.rdo === 0) {
          setCursos(response.data);
          const cursoEncontrado = response.data.find(
            (c) => c._id.toString() === id
          );
          setCurso(cursoEncontrado);

          if (cursoEncontrado) {
            const result = await getComentariosByCursoId(cursoEncontrado._id);
            setComentarios(result);
          }
        } else {
          console.error(response.mensaje);
        }
      } catch (error) {
        console.error("Error al obtener cursos:", error);
      }
    };

    fetchCursos();
  }, [id]);

  useEffect(() => {
    const fetchProfesor = async () => {
      try {
        if (curso && curso.teacher) {
          const idProfesor = curso.teacher;
          const respuesta = await obtenerProfesorPorId(idProfesor);

          if (respuesta) {
            setProfesor(respuesta.profesor.data);
          }
        }
      } catch (error) {
        console.error("Error al obtener profesor:", error);
      }
    };
    fetchProfesor();
  }, [curso]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseComments = () => {};

  if (!curso) {
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
    category,
    frequency,
    type,
    stars,
  } = curso;

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
          <Paper elevation={3} style={HeaderImage}>
            <div style={ImageContainer}>
              <img src={image} alt="Curso Imagen" style={Image} />
            </div>
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
                  <Typography variant="body2" gutterBottom>
                    <strong>Duración:</strong> {duration} horas
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Frecuencia:</strong> {frequency}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Precio:</strong> ${price}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleOpenDialog}
                  >
                    Comprar Curso
                  </Button>

                  <CompraForm
                    open={isDialogOpen} 
                    handleClose={handleCloseDialog}
                  />

                  <Divider style={{ padding: "2rem" }} />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    textAlign={"center"}
                  >
                    Valoración del Curso
                  </Typography>
                  <RatingStars rating={parseFloat(stars)} />
                </CardContent>
              </InfoBox>
            </Grid>

            <Grid item xs={12} sm={6} className="info-square">
              <InfoBox className="info-square">
                {profesor && (
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4">Docente a Cargo</Typography>

                    <CardMedia
                      component="img"
                      className="card-image"
                      src={profesor.image}
                      alt="Profesor Imagen"
                      style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                        margin: "1rem",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Typography variant="body1">
                      {profesor ? profesor.name : "No se encontró el docente"}{" "}
                      {profesor.lastName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {profesor.age} años
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {profesor.email}
                    </Typography>
                    <Typography variant="body1">
                      {profesor
                        ? profesor.background
                        : "No se encontró experiencia cargada"}
                    </Typography>
                  </CardContent>
                )}
              </InfoBox>
            </Grid>
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

          <Grid container spacing={3} style={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Comentarios
                  </Typography>
                  <CommentTextArea
                    cursoTitle={title}
                    courseId={id}
                    idTeacher={curso.teacher}
                    handleClose={handleCloseComments}
                  />
                  <CommentGrid comments={comentarios} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>

      <CompraForm
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        curso={curso}
      />
    </>
  );
};

export default CursoIndividual;

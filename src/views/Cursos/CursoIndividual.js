import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../componentes/Breadcrumb/Breadcrumb";
import profesoresData from "../../data/ejemplo-profesores.json";
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
  obtenerTodosLosCursos,
  obtenerProfesorPorId,
} from "../../controller/miApp.controller";

// Mock de comentarios
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

export default function CursoIndividual() {
  const [cursos, setCursos] = useState([]);
  const [profesor, setProfesor] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await obtenerTodosLosCursos();
      if (response.rdo === 0) {
        setCursos(response.data.docs);
        console.log("cursos: ", response.data.docs);
      } else {
        console.error(response.mensaje);
      }
    };

    fetchCursos();
  }, []);

  const { id } = useParams();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseComments = () => {
    // Lógica para cerrar la snackbar
  };

  const curso = cursos.find((curso) => curso._id === id);

  useEffect(() => {
    const fetchProfesor = async () => {
      if (curso && curso.teacher) {
        const idProfesor = curso.teacher;
        const respuesta = await obtenerProfesorPorId(idProfesor);
        
        if (respuesta) {
          setProfesor(respuesta.profesor.data);
        }
      }
    };
    fetchProfesor();
  }, [curso]);

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
    teacher ,
    category,
    frequency,
    type,
  } = curso;

  const imgSlices = image ? image.split("/") : [];
  const imageName = imgSlices.length > 0 ? imgSlices[imgSlices.length - 1] : null;

  const imageUrl = imageName ? `/img/cursos/${imageName}` : null;

  const docenteIMGFullURL = profesor ? profesor.image : null;
  const docenteIMGSlices = docenteIMGFullURL ? docenteIMGFullURL.split("/") : [];
  const docenteIMGName = docenteIMGSlices.length > 0 ? docenteIMGSlices[docenteIMGSlices.length - 1] : null;

  const docenteImageUrl = docenteIMGName ? `/img/profesores/${docenteIMGName}` : null;

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
              <img src={imageUrl} alt="Curso Imagen" style={Image} />
            </div>
          </Paper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className="info-square">
              <InfoBox className="info-container">
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {description}
                </Typography>
                <Typography variant="body2" paragraph>
                  {profesor ? (
                    <Typography variant="body2" paragraph>
                      <strong>Profesor:</strong> {profesor.name}
                    </Typography>
                  ) : (
                    <div>Cargando...</div>
                  )}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Categoría:</strong> {category}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Duración:</strong> {duration} horas
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Precio:</strong> ${price}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Frecuencia:</strong> {frequency}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Tipo:</strong> {type}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Materias:</strong> {subjects.join(", ")}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleOpenDialog}
                >
                  Comprar Curso
                </Button>
              </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Descripción Extendida
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {extendedDescription}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Docente
                  </Typography>
                  {profesor && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={docenteImageUrl} alt="Docente Imagen" style={{ width: "80px", marginRight: "1rem" }} />
                      <div>
                        <Typography variant="body1">{profesor.name}</Typography>
                        <Typography variant="body2" paragraph>
                          {profesor.bio}
                        </Typography>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Comentarios
                  </Typography>
                  <CommentTextArea courseId={curso._id} /> 
                  <CommentGrid comments={comments} handleClose={handleCloseComments} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>

      <CompraForm isOpen={isDialogOpen} handleClose={handleCloseDialog} curso={curso} />
    </>
  );
}

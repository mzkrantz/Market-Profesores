import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import "../TableStyles.css";
import SpacerTop from "../../../componentes/Spacer/SpacerTop";
import EditCursoForm from "../../../componentes/Forms/EditCursoForm";

const mockCourses = [
  {
    id: 1,
    image: "curso-programacion.jpg",
    title: "Desarrollo Web Avanzado",
    description: "Domina el desarrollo web con tecnologías modernas y conviértete en un experto en el campo.",
    duration: "12",
    frequency: "2",
    price: "199.99",
    buttonLink: "https://ejemplo.com/curso-desarrollo-web-avanzado",
    category: "Desarrollo Web",
    extendedDescription: "Domina el desarrollo web con tecnologías modernas y conviértete en un experto en el campo.",
    subjects: ["HTML", "CSS", "JavaScript"],
    stars: "4.5",
    type: "Grupal",
    teacher: 8,
    published: true,
  },
  {
    id: 2,
    image: "curso-marketing.jpg",
    title: "Marketing Digital Estratégico",
    description: "Aprende a crear campañas de marketing efectivas y maximiza el impacto de tu estrategia.",
    duration: "8",
    frequency: "3",
    price: "149.99",
    buttonLink: "https://ejemplo.com/curso-marketing-digital",
    category: "Marketing Digital",
    extendedDescription: "Aprende a crear campañas de marketing efectivas y maximiza el impacto de tu estrategia.",
    subjects: ["Marketing en redes sociales", "SEO", "Publicidad en línea"],
    stars: "4",
    type: "Individual",
    teacher: 7,
    published: false,
  },
  {
    id: 3,
    image: "curso-diseno-grafico.jpg",
    title: "Diseño Gráfico Creativo",
    description: "Desarrolla tus habilidades de diseño gráfico y crea proyectos visualmente atractivos.",
    duration: "10",
    frequency: "2",
    price: "179.99",
    buttonLink: "https://ejemplo.com/curso-diseno-grafico",
    category: "Diseño Gráfico",
    extendedDescription: "Desarrolla tus habilidades de diseño gráfico y crea proyectos visualmente atractivos.",
    subjects: ["Adobe Photoshop", "Ilustración digital", "Diseño de logotipos"],
    stars: "4.2",
    type: "Grupal",
    teacher: 5,
    published: true,
  },
  {
    id: 4,
    image: "curso-fotografia.jpg",
    title: "Fotografía Profesional",
    description: "Aprende las técnicas esenciales de la fotografía y mejora tus habilidades como fotógrafo.",
    duration: "6",
    frequency: "1",
    price: "99.99",
    buttonLink: "https://ejemplo.com/curso-fotografia-profesional",
    category: "Fotografía",
    extendedDescription: "Aprende las técnicas esenciales de la fotografía y mejora tus habilidades como fotógrafo.",
    subjects: ["Composición", "Iluminación", "Edición de fotos"],
    stars: "4.7",
    type: "Individual",
    teacher: 10,
    published: true,
  },
  {
    id: 5,
    image: "curso-idiomas.jpg",
    title: "Aprende un Nuevo Idioma",
    description: "Sumérgete en una nueva cultura aprendiendo un idioma extranjero de manera efectiva.",
    duration: "16",
    frequency: "4",
    price: "249.99",
    buttonLink: "https://ejemplo.com/curso-aprender-idiomas",
    category: "Idiomas",
    extendedDescription: "Sumérgete en una nueva cultura aprendiendo un idioma extranjero de manera efectiva.",
    subjects: ["Inglés", "Francés", "Español", "Alemán"],
    stars: "4.9",
    type: "Grupal",
    teacher: 12,
    published: true,
  },
  {
    id: 6,
    image: "curso-marketing2.jpg",
    title: "Marketing en Redes Sociales",
    description: "Domina las estrategias de marketing en redes sociales y promociona tus productos de manera efectiva.",
    duration: "8",
    frequency: "3",
    price: "129.99",
    buttonLink: "https://ejemplo.com/curso-marketing-redes-sociales",
    category: "Marketing Digital",
    extendedDescription: "Domina las estrategias de marketing en redes sociales y promociona tus productos de manera efectiva.",
    subjects: ["Publicidad en redes sociales", "Estrategias de contenido"],
    stars: "4.4",
    type: "Individual",
    teacher: 6,
    published: true,
  },
  {
    id: 7,
    image: "curso-programacion2.jpg",
    title: "Introducción a la Programación",
    description: "Comienza tu viaje en la programación y construye una base sólida en el desarrollo de software.",
    duration: "6",
    frequency: "2",
    price: "79.99",
    buttonLink: "https://ejemplo.com/curso-intro-programacion",
    category: "Desarrollo Web",
    extendedDescription: "Comienza tu viaje en la programación y construye una base sólida en el desarrollo de software.",
    subjects: ["Lógica de programación", "Python", "Java"],
    stars: "4.1",
    type: "Grupal",
    teacher: 4,
    published: true,
  },
  {
    id: 8,
    image: "curso-dibujo.jpg",
    title: "Dibujo Creativo",
    description: "Desarrolla tus habilidades artísticas y conviértete en un experto en dibujo creativo.",
    duration: "10",
    frequency: "2",
    price: "149.99",
    buttonLink: "https://ejemplo.com/curso-dibujo-creativo",
    category: "Arte y Diseño",
    extendedDescription: "Desarrolla tus habilidades artísticas y conviértete en un experto en dibujo creativo.",
    subjects: ["Técnicas de dibujo", "Ilustración creativa", "Diseño de personajes"],
    stars: "4.6",
    type: "Grupal",
    teacher: 7,
    published: true,
  },
  {
    id: 9,
    image: "curso-fotografia2.jpg",
    title: "Fotografía de Naturaleza",
    description: "Explora la belleza de la naturaleza a través de la fotografía y captura momentos inolvidables.",
    duration: "8",
    frequency: "1",
    price: "119.99",
    buttonLink: "https://ejemplo.com/curso-fotografia-naturaleza",
    category: "Fotografía",
    extendedDescription: "Explora la belleza de la naturaleza a través de la fotografía y captura momentos inolvidables.",
    subjects: ["Fotografía de paisajes", "Vida silvestre", "Edición de fotos naturales"],
    stars: "4.8",
    type: "Individual",
    teacher: 5,
    published: true,
  },
  {
    id: 10,
    image: "curso-programacion3.jpg",
    title: "Desarrollo de Aplicaciones Móviles",
    description: "Crea aplicaciones móviles increíbles en plataformas iOS y Android.",
    duration: "12",
    frequency: "3",
    price: "199.99",
    buttonLink: "https://ejemplo.com/curso-desarrollo-aplicaciones-moviles",
    category: "Desarrollo Web",
    extendedDescription: "Crea aplicaciones móviles increíbles en plataformas iOS y Android.",
    subjects: ["Desarrollo para iOS", "Desarrollo para Android", "Diseño de aplicaciones"],
    stars: "4.7",
    type: "Grupal",
    teacher: 9,
    published: true,
  },
  {
    id: 11,
    image: "curso-cocina.jpg",
    title: "Cocina Gourmet",
    description: "Conviértete en un chef gourmet y sorprende a todos con tus deliciosas creaciones culinarias.",
    duration: "10",
    frequency: "2",
    price: "169.99",
    buttonLink: "https://ejemplo.com/curso-cocina-gourmet",
    category: "Cocina",
    extendedDescription: "Conviértete en un chef gourmet y sorprende a todos con tus deliciosas creaciones culinarias.",
    subjects: ["Técnicas de cocina", "Platos gourmet", "Presentación de platos"],
    stars: "4.9",
    type: "Individual",
    teacher: 6,
    published: true,
  },
];

const CourseList = styled(TableContainer)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  overflow-x: auto;
  max-width: 100%;
`;

const ResponsiveTable = styled(Table)`
background-color: #fff;
@media (max-width: 600px) {
  font-size: 12px;
  table {
    width: 100%;
  }
  
  th,
  td {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 10px;
  }

  td:last-child {
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid grey;
  }
}
`;

const ButtonContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px;
  align-items: center; // Centramos los botones
`;

const MisCursos = () => {
  const [courses, setCourses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Container>
        <SpacerTop>
          <Typography variant="h4" component="h1" gutterBottom>
            Mis Cursos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditingCourse();
              openForm();
            }}
          >
            Crear Nuevo Curso
          </Button>
        </SpacerTop>
        <CourseList component={TableContainer}>
          <ResponsiveTable className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell>Curso</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>
                      {course.published ? "Publicado" : "No Publicado"}
                    </TableCell>
                    <TableCell>
                      <ButtonContainer>
                        <IconButton
                          className="boton-tabla"
                          onClick={() => {
                            setEditingCourse(course);
                            openForm();
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </ButtonContainer>
                      <ButtonContainer>
                        <IconButton
                          className="boton-tabla"
                          onClick={() => {
                            alert("Implementar la lógica de publicación/despublicación");
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </ButtonContainer>
                      <ButtonContainer>
                        <IconButton
                          className="boton-tabla"
                          onClick={() => {
                            alert("Implementar la lógica de eliminación");
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ButtonContainer>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </ResponsiveTable>
        </CourseList>
        <TablePagination
          component="div"
          count={courses.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      {isFormOpen && (
        <EditCursoForm
          open={isFormOpen}
          handleClose={closeForm}
          cursoToEdit={editingCourse}
          title={editingCourse ? "Editar Curso" : "Crear Nuevo Curso"}
        />
      )}
    </>
  );
};

export default MisCursos;

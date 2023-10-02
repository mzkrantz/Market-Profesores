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
import "./MisCursosStyles.css";
import SpacerTop from "../../../componentes/Spacer/SpacerTop";
import EditCursoForm from "../../../componentes/Forms/EditCursoForm";

// Simulacion datos de cursos del profesor, cargar desde el json? Mock=simulacion
const mockCourses = [
  {
    id: 1,
    title: "Curso 1",
    description: "Descripción del Curso 1",
    published: true,
  },
  {
    id: 2,
    title: "Curso 2",
    description: "Descripción del Curso 2",
    published: false,
  },
  {
    id: 3,
    title: "Curso 3",
    description: "Descripción del Curso 3",
    published: false,
  },
  {
    id: 4,
    title: "Curso 4",
    description: "Descripción del Curso 4",
    published: false,
  },
];

const CourseList = styled(TableContainer)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  overflow-x: auto; // Permite desplazamiento horizontal
  max-width: 100%; // Evita que la tabla se vaya del contenedor
`;

const ResponsiveTable = styled(Table)`
  @media (max-width: 600px) {
    font-size: 12px; // Reducir el tamaño del texto en las celdas para pantallas pequeñas
    table {
      width: 100%; /* Asegurar que la tabla ocupe todo el ancho disponible */
    }

    th,
    td {
      display: flex; /* Convertir celdas en elementos flex (apilados) */
      flex-direction: column;
      text-align: center; /* Alinear el texto a la izquierda */
      margin-bottom: 10px; /* Agregar un espacio entre las celdas */
    }

    td {
      border-bottom: 1px solid #ddd; /* Agregar separadores entre las filas */
      padding: 8px; /* Espaciado interno para las celdas */
    }
  }
`;

const MisCursos = () => {
  const [courses, setCourses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); // Estado para controlar si el formulario está abierto
  const [editingCourse, setEditingCourse] = useState(null);

  // Simulacion de la carga de datos
  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  const openForm = () => {
    setIsFormOpen(true); // Abre el formulario al hacer clic en "Crear Nuevo Curso"
  };

  const closeForm = () => {
    setIsFormOpen(false); // Cierra el formulario
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
              setEditingCourse(); // Establece el curso que se va a editar
              openForm(); // Abre el formulario de creacion
            }} // Abre el formulario al hacer clic
          >
            Crear Nuevo Curso
          </Button>
        </SpacerTop>
        <CourseList component={TableContainer}>
          <ResponsiveTable>
            <TableHead>
              <TableRow>
                <TableCell>Curso</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Publicado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>
                    {course.published ? "Publicado" : "No Publicado"}
                  </TableCell>
                  <TableCell
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Button
                      className="boton-tabla"
                      variant="outlined"
                      onClick={() => {
                        setEditingCourse(course); // Establece el curso que se va a editar
                        openForm(); // Abre el formulario de edición
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      className="boton-tabla"
                      variant="outlined"
                      onClick={() => {
                        // Publicar o despublicar el curso
                        alert(
                          "Implementar la lógica de publicación/despublicación"
                        );
                      }}
                    >
                      {course.published ? "Despublicar" : "Publicar"}
                    </Button>
                    <Button
                      className="boton-tabla"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        // Eliminar el curso
                        alert("Implementar la lógica de eliminación");
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ResponsiveTable>
        </CourseList>
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

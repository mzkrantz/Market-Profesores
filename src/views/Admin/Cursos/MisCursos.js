import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';

// Simulacion datos de cursos del profesor, cargar desde el json? Mock=simulacion
const mockCourses = [
  { id: 1, title: 'Curso 1', description: 'Descripción del Curso 1', published: true },
  { id: 2, title: 'Curso 2', description: 'Descripción del Curso 2', published: false },
];

const CourseList = styled(TableContainer)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const MisCursos = () => {
  const [courses, setCourses] = useState([]);

  // Simulacion de la carga de datos
  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Cursos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Abrir un formulario de creacion de cursos
            alert('Implementar el formulario de creacion de cursos');
          }}
        >
          Crear Nuevo Curso
        </Button>

        <CourseList component={TableContainer}>
          <Table>
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
                  <TableCell>{course.published ? 'Sí' : 'No'}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // Abrir un formulario de edicion de cursos
                        alert('Implementar el formulario de edición de cursos');
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // Publicar o despublicar el curso 
                        alert('Implementar la lógica de publicación/despublicación');
                      }}
                    >
                      {course.published ? 'Despublicar' : 'Publicar'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        // Eliminar el curso 
                        alert('Implementar la lógica de eliminación');
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CourseList>
      </Container>
    </>
  );
};

export default MisCursos;

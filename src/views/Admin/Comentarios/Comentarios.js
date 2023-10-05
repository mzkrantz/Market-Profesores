import React, { useState } from "react";
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
import PopupCommentInfo from "../../../componentes/Popup/PopupCommentInfo";
import ModalCustom from "../../../componentes/Modal/ModalCustom";
import SpacerTop from "../../../componentes/Spacer/SpacerTop";
import RatingStars from "../../../componentes/RatingStars/RatingStars";
import "../TableStyles.css";

const mockComments = [
  {
    id: 1,
    title: "Curso de Desarrollo Web",
    user: {
      id: 1,
      nombre: "Juan Perez",
      telefono: "123-456-7890",
      mail: "juan@example.com",
      horario: "Tarde",
      mensaje: "Este curso es genial, lo recomiendo completamente.",
      score: 3,
    },
  },
  {
    id: 2,
    title: "Curso de Marketing Digital",
    user: {
      id: 2,
      nombre: "María Gonzalez",
      apellido: "González",
      telefono: "987-654-3210",
      mail: "maria@example.com",
      horario: "Mañana",
      mensaje: "Estoy interesada en este curso. ¿Cómo puedo inscribirme?",
      score: 2,
    },
  },
];

const CommentList = styled(TableContainer)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  overflow-x: auto;
  max-width: 100%;
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

    td:last-child {
      border-bottom: 1px solid #ddd; /* Agregar separadores entre las filas */
      margin-bottom: 1rem; /* Agregar un espacio entre las celdas */
      padding-bottom: 2rem; /* Agregar un espacio entre las celdas */
      border-bottom: 2px solid grey; /* Agregar separadores entre las filas */
    }
  }
`;

const Comentarios = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };
  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const openPopup = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  return (
    <>
      <Container>
        <SpacerTop>
          <Typography variant="h4" component="h1" gutterBottom>
            Comentarios
          </Typography>
        </SpacerTop>
        <CommentList component={TableContainer}>
          <ResponsiveTable>
            <TableHead>
              <TableRow>
                <TableCell>Curso</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Puntaje</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.title}</TableCell>
                  <TableCell>{comment.user.nombre}</TableCell>
                  <TableCell>
                    <RatingStars rating={parseFloat(comment.user.score)} />
                  </TableCell>
                  <TableCell>
                    <Button
                      className="boton-tabla"
                      variant="outlined"
                      onClick={() => openCommentModal(openPopup(comment.user))}
                    >
                      Ver
                    </Button>
                    <Button
                      className="boton-tabla"
                      variant="outlined"
                      onClick={() => {
                        alert("Implementar la lógica de Aceptado");
                      }}
                    >
                      Aceptar
                    </Button>
                    <Button
                      className="boton-tabla"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        alert("Implementar la lógica de Bloqueo");
                      }}
                    >
                      Bloquear
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ResponsiveTable>
        </CommentList>
      </Container>
      {isPopupOpen && (
        <ModalCustom open={isCommentModalOpen} onClose={closeCommentModal}>
          <PopupCommentInfo
            user={selectedUser}
            onClose={() => setIsPopupOpen(false)}
          />
        </ModalCustom>
      )}
    </>
  );
};
export default Comentarios;

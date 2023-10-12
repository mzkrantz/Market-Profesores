import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
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
  {
    id: 10,
    title: "Curso de Diseño Gráfico",
    user: {
      id: 3,
      nombre: "Luis Ramirez",
      telefono: "555-555-5555",
      mail: "luis@example.com",
      horario: "Tarde",
      mensaje: "Me encanta el diseño gráfico. ¡Este curso suena emocionante!",
      score: 4,
    },
  },
  {
    id: 11,
    title: "Curso de Programación Avanzada",
    user: {
      id: 4,
      nombre: "Ana Sánchez",
      telefono: "777-777-7777",
      mail: "ana@example.com",
      horario: "Noche",
      mensaje: "¿Este curso requiere experiencia previa en programación?",
      score: 5,
    },
  },
  {
    id: 12,
    title: "Curso de Fotografía Digital",
    user: {
      id: 5,
      nombre: "Carlos Rodriguez",
      telefono: "888-888-8888",
      mail: "carlos@example.com",
      horario: "Tarde",
      mensaje: "Me interesa la fotografía. ¿Cuál es el costo del curso?",
      score: 4,
    },
  },
];

const CommentList = styled(TableContainer)`
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

    td {
      border-bottom: 1px solid #ddd;
      padding: 8px;
    }

    td:last-child {
      border-bottom: 1px solid #ddd;
      margin-bottom: 1rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid grey;
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
                    <IconButton
                      className="boton-tabla"
                      onClick={() => openCommentModal(openPopup(comment.user))}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      className="boton-tabla"
                      onClick={() => {
                        alert("Implementar la lógica de Aceptado");
                      }}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      className="boton-tabla"
                      color="error"
                      onClick={() => {
                        alert("Implementar la lógica de Rechazo");
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
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

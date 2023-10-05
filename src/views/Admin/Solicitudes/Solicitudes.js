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
import PopupUserInfo from "../../../componentes/Popup/PopupUserInfo";
import ModalCustom from "../../../componentes/Modal/ModalCustom";
import SpacerTop from "../../../componentes/Spacer/SpacerTop";
import "../TableStyles.css";

const mockSolicitudes = [
  {
    id: 1,
    title: "Curso de Desarrollo Web",
    solicitud: {
      status: "Finalizada",
      nombre: "Juan Perez",
      telefono: "123456789",
      mail: "juan@example.com",
      horario: "Tarde",
      mensaje: "Estoy interesado en tus cursos, ¿cómo puedo inscribirme?",
    },
  },
  {
    id: 2,
    title: "Curso de Marketing Digital",
    solicitud: {
      status: "Solicitada",
      nombre: "María Perez",
      telefono: "123456789",
      mail: "maria@example.com",
      horario: "Mañana",
      mensaje: "¿Puedes proporcionarme más información sobre los cursos?",
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

const Solicitudes = () => {
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
            Solicitudes
          </Typography>
        </SpacerTop>
        <CommentList component={TableContainer}>
          <ResponsiveTable>
            <TableHead>
              <TableRow>
                <TableCell>Curso</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockSolicitudes.map((curso) => (
                <TableRow key={curso.id}>
                  <TableCell>{curso.title}</TableCell>
                  <TableCell>
                    {curso.solicitud.nombre}
                  </TableCell>
                  <TableCell>
                    {curso.solicitud.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="boton-tabla"
                      variant="outlined"
                      onClick={() =>
                        openCommentModal(openPopup(curso.solicitud))
                      }
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
                        alert("Implementar la lógica de Cancelacion");
                      }}
                    >
                      Rechazar
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
          <PopupUserInfo
            user={selectedUser}
            onClose={() => setIsPopupOpen(false)}
          />
        </ModalCustom>
      )}
    </>
  );
};

export default Solicitudes;

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import PopupMessageInfo from "../../../componentes/Popup/PopupMessageInfo";
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
      mensaje: "Quisiera realizar la compra del Curso de Desarrollo Web",
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
      mensaje:
        "Me gustaría hacer la compra sobre el curso de Marketing Digital",
    },
  },
];

const mockMensajes = [
  {
    id: 1,
    nombre: "Juan Ramirez",
    telefono: "123456789",
    mail: "juan@example.com",
    mensaje: "Estoy interesado en tus cursos, ¿cómo puedo hacerlo?",
  },
  {
    id: 2,
    nombre: "María Mariani",
    telefono: "123456789",
    mail: "maria@example.com",
    mensaje:
      "¿Puedes proporcionarme más información sobre el curso de Fotografía de Naturaleza?",
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

const Solicitudes = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 para "Solicitudes", 1 para "Mensajes"

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Container>
        <SpacerTop>
          <Typography variant="h4" component="h1" gutterBottom>
            Solicitudes y Mensajes
          </Typography>

          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Solicitudes" />
            <Tab label="Mensajes" />
          </Tabs>
        </SpacerTop>

        {activeTab === 0 && (
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
                    <TableCell>{curso.solicitud.nombre}</TableCell>
                    <TableCell>{curso.solicitud.status}</TableCell>
                    <TableCell>
                      <IconButton
                        className="boton-tabla"
                        onClick={() =>
                          openCommentModal(openPopup(curso.solicitud))
                        }
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
                          alert("Implementar la lógica de Cancelacion");
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
        )}

        {activeTab === 1 && (
          <CommentList component={TableContainer}>
            <ResponsiveTable>
              <TableHead>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Mail</TableCell>
                  <TableCell>Telefono</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockMensajes.map((mensaje) => (
                  <TableRow key={mensaje.id}>
                    <TableCell>{mensaje.nombre}</TableCell>
                    <TableCell>{mensaje.mail}</TableCell>
                    <TableCell>{mensaje.telefono}</TableCell>
                    <TableCell>
                      <IconButton
                        className="boton-tabla"
                        onClick={() => openCommentModal(openPopup(mensaje))}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        className="boton-tabla"
                        onClick={() => {
                          alert("Implementar la lógica de Envio de Mail");
                        }}
                      >
                        <MailOutlineIcon />
                      </IconButton>
                      <IconButton
                        className="boton-tabla"
                        onClick={() => {
                          alert("Implementar la lógica de Eliminado");
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ResponsiveTable>
          </CommentList>
        )}
      </Container>

      {isPopupOpen && (
        <ModalCustom open={isCommentModalOpen} onClose={closeCommentModal}>
          <PopupMessageInfo
            user={selectedUser}
            onClose={() => setIsPopupOpen(false)}
          />
        </ModalCustom>
      )}
    </>
  );
};

export default Solicitudes;

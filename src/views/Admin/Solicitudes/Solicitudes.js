import React, { useState, useEffect } from "react";
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
import { styled } from "@mui/system";
import PopupMessageInfo from "../../../componentes/Popup/PopupMessageInfo";
import ModalCustom from "../../../componentes/Modal/ModalCustom";
import SpacerTop from "../../../componentes/Spacer/SpacerTop";
import TablePagination from "@mui/material/TablePagination";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  obtenerSolicitudesPorProfesorId,
  actualizarEstadoSolicitud,
} from "../../../controller/miApp.controller";

import "../TableStyles.css";

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

const TableWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Solicitudes = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Elementos por página

  const [solicitudes, setSolicitudes] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchSolicitudes = async () => {
    const profesorId = "tuProfesorId"; // Reemplaza esto con el id del profesor que necesitas
    const result = await obtenerSolicitudesPorProfesorId(profesorId);
    if (result.rdo === 0) {
      setSolicitudes(result.solicitudes);
    } else {
      console.error(result.mensaje);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const openPopup = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage > 0 ? newRowsPerPage : 10); // Aseguramos que sea un valor permitido
    setPage(0);
  };

  const handleAccept = async (solicitud, solicitudId) => {
    if (solicitud.estado === 0) {
      const nuevoEstado = 1;
      const result = await actualizarEstadoSolicitud(solicitudId, nuevoEstado);
      if (result.rdo === 0) {
        showSnackbar("Estado actualizado correctamente", "success");
        fetchSolicitudes();
      } else {
        showSnackbar(result.mensaje, "error");
      }
    } else {
      handleFinalize(solicitud, solicitudId);
    }
  };

  const handleFinalize = async (solicitud, solicitudId) => {
    if (solicitud.estado === 1) {
      const nuevoEstado = 2;
      const result = await actualizarEstadoSolicitud(solicitudId, nuevoEstado);
      if (result.rdo === 0) {
        showSnackbar("Estado actualizado correctamente", "success");
        fetchSolicitudes();
      } else {
        showSnackbar(result.mensaje, "error");
      }
    } else if (solicitud.estado === 2) {
      showSnackbar("La solicitud ya está finalizada", "error");
    } else {
      showSnackbar("La solicitud ya está cancelada", "error");
    }
  };

  const handleCancel = async (solicitud, solicitudId) => {
    if (solicitud.estado === 0 || solicitud.estado === 1) {
      const nuevoEstado = 3;
      const result = await actualizarEstadoSolicitud(solicitudId, nuevoEstado);
      if (result.rdo === 0) {
        showSnackbar("Estado actualizado correctamente", "success");
        fetchSolicitudes();
      } else {
        showSnackbar(result.mensaje, "error");
      }
    } else if (solicitud.estado === 2) {
      showSnackbar("La solicitud ya está finalizada", "error");
    } else {
      showSnackbar("La solicitud ya está cancelada", "error");
    }
  };

  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    if (tabValue === 0) {
      return solicitud.estado === 0; // Pendientes
    } else if (tabValue === 1) {
      return solicitud.estado === 1; // Aceptadas
    } else {
      return solicitud.estado === 2 || solicitud.estado === 3; // Finalizadas/Canceladas
    }
  });

  return (
    <>
      <Container>
        <SpacerTop>
          <Typography variant="h4" component="h1" gutterBottom>
            Solicitudes
          </Typography>
        </SpacerTop>

        <Tabs
          value={tabValue}
          onChange={(event, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Pendientes" />
          <Tab label="Aceptadas" />
          <Tab label="Finalizadas/Canceladas" />
        </Tabs>

        <TableWrapper>
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
                {filteredSolicitudes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((solicitud) => (
                    <TableRow key={solicitud._id}>
                      <TableCell>{solicitud.cursoNombre}</TableCell>
                      <TableCell>{solicitud.nombre}</TableCell>
                      <TableCell>
                        {solicitud.estado === 0 && "Pendiente"}
                        {solicitud.estado === 1 && "Aceptada"}
                        {solicitud.estado === 2 && "Finalizada"}
                        {solicitud.estado === 3 && "Cancelada"}
                      </TableCell>

                      <TableCell>
                        <IconButton
                          className="boton-tabla"
                          onClick={() => openCommentModal(openPopup(solicitud))}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          className="boton-tabla"
                          onClick={() => handleAccept(solicitud, solicitud._id)}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          className="boton-tabla"
                          color="error"
                          onClick={() => {
                            handleCancel(solicitud, solicitud._id);
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
          <TablePagination
            component="div"
            count={filteredSolicitudes.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableWrapper>
      </Container>

      {isPopupOpen && (
        <ModalCustom open={isCommentModalOpen} onClose={closeCommentModal}>
          <PopupMessageInfo
            user={selectedUser}
            onClose={() => setIsPopupOpen(false)}
          />
        </ModalCustom>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Solicitudes;

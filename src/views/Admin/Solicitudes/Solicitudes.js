import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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

  const handleAccept = async (solicitudId) => {
    const result = await actualizarEstadoSolicitud(solicitudId, true);
    if (result.rdo === 0) {
      console.log(result.mensaje);
      fetchSolicitudes();
      
    } else {
      console.error(result.mensaje);
    }
  };

  return (
    <>
      <Container>
        <SpacerTop>
          <Typography variant="h4" component="h1" gutterBottom>
            Solicitudes
          </Typography>
        </SpacerTop>

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
                {solicitudes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((solicitud) => (
                    <TableRow key={solicitud._id}>
                      <TableCell>{solicitud.cursoNombre}</TableCell>
                      <TableCell>{solicitud.nombre}</TableCell>
                      <TableCell>
                        {solicitud.aceptado ? "Aceptado" : "Pendiente"}
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
                          onClick={() => handleAccept(solicitud._id)}
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
          <TablePagination
            component="div"
            count={solicitudes.length}
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
    </>
  );
};

export default Solicitudes;

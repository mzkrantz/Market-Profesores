import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
import TablePagination from "@mui/material/TablePagination";
import {
  getComentariosByProfesorId,
  updateEstadoPublicacion,
  eliminarComentario,
} from "../../../controller/miApp.controller";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [comentarios, setComentarios] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchComentarios = async () => {
    const result = await getComentariosByProfesorId();
    setComentarios(result);
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCheckClick = async (comentarioId) => {
    try {
      await updateEstadoPublicacion(comentarioId);
      fetchComentarios();
      showSnackbar("Publicación actualizada correctamente", "success");
    } catch (error) {
      console.error("Error updating publicacion:", error.message);
      showSnackbar("Error al actualizar la publicación", "error");
    }
  };

  const handleDeleteClick = async (comentarioId) => {
    try {
      await eliminarComentario(comentarioId);
      fetchComentarios();
      showSnackbar("Comentario eliminado correctamente", "success");
    } catch (error) {
      console.error("Error deleting comentario:", error.message);
      showSnackbar("Error al eliminar el comentario", "error");
    }
  };

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const openPopup = (comentario) => {
    setSelectedUser(comentario);
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
              {comentarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((comentario) => (
                  <TableRow key={comentario._id}>
                    <TableCell>{comentario.nombreCurso}</TableCell>
                    <TableCell>{comentario.nombre}</TableCell>
                    <TableCell>
                      <RatingStars
                        rating={parseFloat(comentario.calificacion)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className="boton-tabla"
                        onClick={() => openCommentModal(openPopup(comentario))}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        className="boton-tabla"
                        onClick={() => handleCheckClick(comentario._id)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        className="boton-tabla"
                        color="error"
                        onClick={() => {
                          handleDeleteClick(comentario._id);
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
          count={comentarios.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ justifyContent: "flex-end" }}
        />
      </Container>
      {isPopupOpen && (
        <ModalCustom open={isCommentModalOpen} onClose={closeCommentModal}>
          <PopupCommentInfo
            comment={selectedUser}
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

export default Comentarios;

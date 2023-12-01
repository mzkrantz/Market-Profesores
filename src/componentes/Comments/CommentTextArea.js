import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RatingStarsDynamic from "../RatingStars/RatingStarsDynamic";
import TextField from "@mui/material/TextField";
import { enviarComentario } from "../../controller/miApp.controller";

export default function CommentTextArea({
  handleClose,
  courseId,
  idTeacher,
  cursoTitle,
}) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const maxCharacters = 100;
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isErrorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const enviarInformacion = async (nombre, comentario, calificacion) => {
    const data = {
      nombreCurso: cursoTitle,
      idCurso: courseId,
      idProfesor: idTeacher,
      nombre: nombre,
      comentario: comentario,
      calificacion: calificacion,
    };

    const respuesta = await enviarComentario(data);

    if (respuesta.status === 200) {
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = () => {
    if (name.trim() !== "" && comment.trim() !== "") {
      enviarInformacion(name, comment, rating);
      setSnackbarOpen(true);
      handleClose();

      setName("");
      setComment("");
      setRating(0);
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };

  const handleChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= maxCharacters) {
      setComment(inputText);
    }
  };

  return (
    <FormControl style={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <FormLabel
          component="h5"
          sx={{
            fontSize: "1.5rem",
            color: "text.primary",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          Deja un Comentario
        </FormLabel>
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <RatingStarsDynamic rating={rating} setRating={setRating} />
        <TextareaAutosize
          placeholder="Escribe algo aquí..."
          minRows={8}
          value={comment}
          onChange={handleChange}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "none",
            fontSize: "15px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <p
            className={
              comment.length === maxCharacters ? "character-count-error" : ""
            }
            style={{
              marginTop: "-1rem",
            }}
          >
            {comment.length}/{maxCharacters}
          </p>
          <Button
            className="button-comment"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </Box>
      </Box>
      {/* Snackbar para mostrar el mensaje de éxito */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleCloseSnackbar}
        >
          Comentario enviado correctamente
        </MuiAlert>
      </Snackbar>

      {/* Snackbar para mostrar el mensaje de error */}
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleCloseSnackbar}
        >
          Por favor, complete todos los campos y seleccione un puntaje.
        </MuiAlert>
      </Snackbar>
    </FormControl>
  );
}

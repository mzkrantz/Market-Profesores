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
import {enviarComentario} from "../../controller/miApp.controller";

export default function CommentTextArea({ handleClose, courseId }) { 
  
  const [name, setName] = useState(""); // Estado para el nombre
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const maxCharacters = 100;
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isErrorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const enviarInformacion = async (nombre, comentario) => {
    const data = {
      idCurso: courseId,
      nombre: nombre,
      comentario: comentario,
    };

    const respuesta = await enviarComentario(data);

    if (respuesta.status === 200) {
      setSnackbarOpen(true);
   
        
      }

  };

  // Llama a la función handleSubmit en tu componente CommentTextArea
  const handleSubmit = () => {
    if (name.trim() !== "" && comment.trim() !== "") {
      enviarInformacion(name, comment);
      setSnackbarOpen(true);
      handleClose();
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

  console.log("Course ID:", courseId); // Agregar este console.log para mostrar el ID del curso

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
          onChange={(e) => setName(e.target.value)} // Actualizar el estado del nombre
        />
        <RatingStarsDynamic
          rating={rating}
          setRating={setRating} // Pasar el estado del puntaje y la función para actualizarlo
        />
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

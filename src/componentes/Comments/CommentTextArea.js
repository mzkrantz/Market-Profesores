import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RatingStarsDynamic from "../RatingStars/RatingStarsDynamic";

export default function CommentTextArea({ handleClose }) {
  const [comment, setComment] = React.useState("");
  const maxCharacters = 100; // Define límite máximo de caracteres
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = () => {
    // Lógica de envío de comentario
    // Después de enviar el comentario, abre el Snackbar
    setSnackbarOpen(true);
    handleClose();
  };

  // Función para cerrar el snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
        <RatingStarsDynamic />
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
    </FormControl>
  );
}

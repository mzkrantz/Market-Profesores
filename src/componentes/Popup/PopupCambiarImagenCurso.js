import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDropzone } from "react-dropzone";
import { actualizarImagenCurso } from "../../controller/miApp.controller";

const PopupCambiarImagenCurso = ({ open, handleClose, cursoToEdit, title }) => {
  const [image, setImage] = useState(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async () => {
    if (!image) {
      console.error("No se ha seleccionado ninguna imagen.");
      return;
    }
    try {
      console.log("id del curso: ", cursoToEdit._id);
      await actualizarImagenCurso(cursoToEdit._id, image);
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error("Error al actualizar la imagen del curso:", error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => setImage(acceptedFiles[0]),
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="custom-opacity">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            <input {...getInputProps()} />
            <p>
              Arrastra y suelta una imagen aquí, o haz clic para seleccionar
              una.
            </p>
          </div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleClose}
        >
          Imagen actualizada correctamente
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PopupCambiarImagenCurso;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDropzone } from "react-dropzone";
import "./FormStyles.css"

export default function EditCursoForm({ open, handleClose, cursoToEdit,title }) {
  const [cursoData, setCursoData] = useState({});
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Si se proporciona un curso para editar, cargar los datos del curso en el formulario
    if (cursoToEdit) {
      setCursoData(cursoToEdit);
    } else {
      // Restablecer el formulario si no se proporciona un curso para editar
      setCursoData({
        id: 0,
        image: null,
        title: "",
        description: "",
        duration: "",
        frequency: "",
        price: "",
        buttonLink: "",
        category: "",
        extendedDescription: "",
        subjects: [],
        stars: "0",
        type: "",
        teacher: 0,
        published: false,
      });
    }
  }, [cursoToEdit]);

  const handleSubmit = () => {
    // Agregar la lógica para enviar el formulario aquí

    // Simulación de éxito
    setSnackbarOpen(true); // Abre el Snackbar
    handleClose();
  };

  const handleFileUpload = (acceptedFiles) => {
    // Manejar la carga de archivos aquí, por ejemplo, guardar el archivo en el estado
    const file = acceptedFiles[0];
    setCursoData({ ...cursoData, image: file });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Solo permitir archivos de imagen
    onDrop: handleFileUpload,
  });

  // Función para cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className="custom-opacity"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.title}
            onChange={(e) =>
              setCursoData({ ...cursoData, title: e.target.value })
            }
          />
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.description}
            onChange={(e) =>
              setCursoData({ ...cursoData, description: e.target.value })
            }
          />
          <TextField
            label="Categoría"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.category}
            onChange={(e) =>
              setCursoData({ ...cursoData, category: e.target.value })
            }
          />
          {/* Otros campos de entrada aquí, como duración, frecuencia, etc. */}
          <FormControl fullWidth margin="normal">
            <InputLabel label="Tipo">Tipo</InputLabel>
            <Select
              value={cursoData.type}
              onChange={(e) =>
                setCursoData({ ...cursoData, type: e.target.value })
              }
            >
              <MenuItem value="Individual">Individual</MenuItem>
              <MenuItem value="Grupal">Grupal</MenuItem>
            </Select>
          </FormControl>
          {/* Campo de carga de archivos para la imagen */}
          <div {...getRootProps()} style={dropzoneStyle}>
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

      {/* Snackbar para mostrar el mensaje emergente */}
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
          Curso creado o actualizado correctamente
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

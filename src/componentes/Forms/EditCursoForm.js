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
import "./FormStyles.css";

export default function EditCursoForm({ open, handleClose, cursoToEdit, title }) {
  const [cursoData, setCursoData] = useState({
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
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (cursoToEdit) {
      setCursoData(cursoToEdit);
    } else {
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
    setSnackbarOpen(true);
    handleClose();
  };

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setCursoData({ ...cursoData, image: file });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleFileUpload,
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="custom-opacity">
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
            label="Duración (meses)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.duration}
            onChange={(e) =>
              setCursoData({ ...cursoData, duration: e.target.value })
            }
          />
          <TextField
            label="Frecuencia (N)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.frequency}
            onChange={(e) =>
              setCursoData({ ...cursoData, frequency: e.target.value })
            }
          />
          <TextField
            label="Precio"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.price}
            onChange={(e) =>
              setCursoData({ ...cursoData, price: e.target.value })
            }
          />
          <TextField
            label="Descripción Extendida"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.extendedDescription}
            onChange={(e) =>
              setCursoData({
                ...cursoData,
                extendedDescription: e.target.value
              })
            }
          />
          <TextField
            label="Materias (hasta 5, separadas por comas)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cursoData.subjects ? cursoData.subjects.join(", ") : ""}
            onChange={(e) =>
              setCursoData({
                ...cursoData,
                subjects: e.target.value.split(",").map((subject) => subject.trim()),
              })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel label="Categoría">Categoría</InputLabel>
            <Select
              value={cursoData.category}
              label="Categoría"
              onChange={(e) =>
                setCursoData({ ...cursoData, category: e.target.value })
              }
            >
              <MenuItem value={""}>Todas las Categorías</MenuItem>
              <MenuItem value={"Desarrollo Web"}>Desarrollo Web</MenuItem>
              <MenuItem value={"Marketing Digital"}>Marketing Digital</MenuItem>
              <MenuItem value={"Diseño Gráfico"}>Diseño Gráfico</MenuItem>
              <MenuItem value={"Idiomas"}>Idiomas</MenuItem>
              <MenuItem value={"Fotografía"}>Fotografía</MenuItem>
              <MenuItem value={"Cocina"}>Cocina</MenuItem>
              <MenuItem value={"Negocios"}>Negocios</MenuItem>
              <MenuItem value={"Salud y Bienestar"}>Salud y Bienestar</MenuItem>
              <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel label="Tipo">Tipo</InputLabel>
            <Select
              value={cursoData.type}
              label="Tipo"
              onChange={(e) =>
                setCursoData({ ...cursoData, type: e.target.value })
              }
            >
              <MenuItem value="Individual">Individual</MenuItem>
              <MenuItem value="Grupal">Grupal</MenuItem>
            </Select>
          </FormControl>
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

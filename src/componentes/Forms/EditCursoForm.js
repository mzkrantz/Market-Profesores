import React, { useState, useEffect } from "react";

import { crearCurso } from '../../controller/miApp.controller';

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

export default function EditCursoForm({
  open,
  handleClose,
  cursoToEdit,
  title,
}) {
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

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    duration: "",
    frequency: "",
    price: "",
    category: "",
    extendedDescription: "",
    type: "",
  });

  const handleSend = () => {
    const newErrors = {};

    if (cursoData.title.trim() === "") {
      newErrors.title = "Titulo es obligatorio";
    }
    if (cursoData.description.trim() === "") {
      newErrors.description = "Descripción Extendida es obligatorio";
    }
    if (cursoData.duration.trim() === "") {
      newErrors.duration = "Duración es obligatorio";
    } else if (!/^\d+$/.test(cursoData.duration)) {
      newErrors.duration = "Ingrese un número entero";
    }
    if (cursoData.frequency.trim() === "") {
      newErrors.frequency = "Frecuencia es obligatorio";
    } else if (!/^\d+$/.test(cursoData.frequency)) {
      newErrors.frequency = "Ingrese un número entero";
    }
    if (cursoData.price.trim() === "") {
      newErrors.price = "Precio es obligatorio";
    } else if (!/^\d+(\.\d{1,2})?$/.test(cursoData.price)) {
      newErrors.price =
        "Ingrese un número decimal válido (hasta 2 decimales separados por punto)";
    }
    if (cursoData.category.trim() === "") {
      newErrors.category = "Categoría es obligatorio";
    }
    if (cursoData.extendedDescription.trim() === "") {
      newErrors.extendedDescription = "Descripción Extendida es obligatorio";
    }
    if (cursoData.type.trim() === "") {
      newErrors.type = "Tipo es obligatorio";
    }

    setErrors(newErrors);
    // Si no hay errores, enviar el formulario
    if (
      Object.values(newErrors).every((error) => error === "") // Comprueba si todos los valores en el objeto de errores son cadenas vacías
    ) {
      
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Convertir el objeto cursoData a FormData para poder enviar el archivo de imagen
    const formData = new FormData();
    Object.keys(cursoData).forEach(key => {
      formData.append(key, cursoData[key]);
    });

    // Imprimir los datos que se van a enviar
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    try {
      // Llamar a la función crearCurso
      console.log('Llamando a crearCurso...'); // Agregar un registro de consola aquí
      const response = await crearCurso(formData);
      console.log('Respuesta de crearCurso:', response); // Agregar un registro de consola aquí

      // Comprobar si la respuesta es exitosa
      if (response.rdo === 0) {
        // Si es exitosa, mostrar el Snackbar
        setSnackbarOpen(true);
      } else {
        // Si no es exitosa, mostrar el mensaje de error
        console.error(response.mensaje);
      }
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir
      console.error('Hubo un error al crear el curso:', error);
    }
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
    handleClose();
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
              helperText={
                <span style={{ color: "#d32f2f" }}>{errors.title}</span>
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
              helperText={
                <span style={{ color: "#d32f2f" }}>{errors.description}</span>
              }
            />
            <TextField
              label="Duración"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cursoData.duration}
              onChange={(e) =>
                setCursoData({ ...cursoData, duration: e.target.value })
              }
              helperText={
                <span style={{ color: "#d32f2f" }}>{errors.duration}</span>
              }
            />
            <TextField
              label="Frecuencia"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cursoData.frequency}
              onChange={(e) =>
                setCursoData({ ...cursoData, frequency: e.target.value })
              }
              helperText={
                <span style={{ color: "#d32f2f" }}>{errors.frequency}</span>
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
              helperText={
                <span style={{ color: "#d32f2f" }}>{errors.price}</span>
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
                  extendedDescription: e.target.value,
                })
              }
              helperText={
                <span style={{ color: "#d32f2f" }}>
                  {errors.extendedDescription}
                </span>
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
                  subjects: e.target.value
                    .split(",")
                    .map((subject) => subject.trim()),
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
                <MenuItem value={"Desarrollo Web"}>Desarrollo Web</MenuItem>
                <MenuItem value={"Marketing Digital"}>
                  Marketing Digital
                </MenuItem>
                <MenuItem value={"Diseño Gráfico"}>Diseño Gráfico</MenuItem>
                <MenuItem value={"Idiomas"}>Idiomas</MenuItem>
                <MenuItem value={"Fotografía"}>Fotografía</MenuItem>
                <MenuItem value={"Cocina"}>Cocina</MenuItem>
                <MenuItem value={"Negocios"}>Negocios</MenuItem>
                <MenuItem value={"Salud y Bienestar"}>
                  Salud y Bienestar
                </MenuItem>
                <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
              </Select>
              <span style={{ color: "#d32f2f" }}>{errors.category}</span>
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
              <span style={{ color: "#d32f2f" }}>{errors.type}</span>
            </FormControl>
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <p>
                Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                una.
              </p>
            </div>
            <Button variant="contained" color="primary" onClick={handleSend}>
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

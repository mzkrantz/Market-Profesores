import React, { useState, useEffect } from "react";

import { crearCurso, actualizarCurso } from "../../controller/miApp.controller";

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
    id: null,
    image: null,
    title: null,
    description: null,
    duration: null,
    frequency: null,
    price: null,
    buttonLink: null,
    category: null,
    extendedDescription: null,
    subjects: null,
    stars: null,
    type: null,
    teacher: null,
    published: false,
  });

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

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
        stars: 0,
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
      Object.values(newErrors).every((error) => error === "") &&
      cursoData.subjects.length <= 5 // Nueva verificación para el campo subjects
    ) {
      console.log(cursoData.title, cursoData.id);
      handleSubmit();
    } else {
      // Si hay un error en el campo subjects, mostrar el mensaje de error
      if (cursoData.subjects.length > 5) {
        newErrors.subjects = "No se permiten más de 5 materias.";
      }

      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    // Convertir el objeto cursoData a FormData para poder enviar el archivo de imagen
    const formData = new FormData();
    for (let key in cursoData) {
      if (cursoData.hasOwnProperty(key)) {
        if (cursoData[key] instanceof File) {
          formData.append(key, cursoData[key]);
        } else if (typeof cursoData[key] === "string") {
          formData.append(key, cursoData[key]);
        } else {
          formData.append(key, JSON.stringify(cursoData[key]));
        }
      }
    }

    try {
      let response;

      // Verificar si el título es "Editar Curso"
      if (title === "Editar Curso") {
        // Si es así, llamar a actualizarCurso
        response = await actualizarCurso(cursoData._id, formData);
      } else {
        // Si no, llamar a crearCurso

        response = await crearCurso(formData);
      }

      if (response.rdo === 0) {
        // Si es exitosa, mostrar el Snackbar
        setSnackbarOpen(true);

        // Cerrar la ventana de diálogo
        setDialogOpen(!dialogOpen);
      } else {
        // Si no es exitosa, mostrar el mensaje de error
        console.error(response.mensaje);
      }
    } catch (error) {
      console.error("Hubo un error al crear el curso:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setCursoData({ ...cursoData, image: acceptedFiles[0] });
    },
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
            onChange={(e) => {
              const subjectsArray = e.target.value
                .split(",")
                .map((subject) => subject.trim());

              // Limitar la longitud del array a 5
              const limitedSubjectsArray = subjectsArray.slice(0, 5);

              setCursoData({
                ...cursoData,
                subjects: limitedSubjectsArray,
              });
            }}
          />
          <span style={{ color: "#d32f2f" }}>{errors.subjects}</span>

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
              <MenuItem value={"Marketing Digital"}>Marketing Digital</MenuItem>
              <MenuItem value={"Diseño Gráfico"}>Diseño Gráfico</MenuItem>
              <MenuItem value={"Idiomas"}>Idiomas</MenuItem>
              <MenuItem value={"Fotografía"}>Fotografía</MenuItem>
              <MenuItem value={"Cocina"}>Cocina</MenuItem>
              <MenuItem value={"Negocios"}>Negocios</MenuItem>
              <MenuItem value={"Salud y Bienestar"}>Salud y Bienestar</MenuItem>
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

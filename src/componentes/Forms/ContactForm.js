import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export default function ContactForm({ open, professorName, handleClose }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  
  const [errors, setErrors] = useState({
    nombre: "",
    telefono: "",
    mail: "",
    mensaje: "",
  });

  const handleFieldChange = (field, value) => {
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } es obligatorio`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  const handleSend = () => {
    const newErrors = {};
    if (nombre.trim() === "") {
      newErrors.nombre = "Nombre es obligatorio";
    }
    if (telefono.trim() === "") {
      newErrors.telefono = "Teléfono es obligatorio";
    }
    if (!emailRegex.test(mail)) {
      newErrors.mail = "Ingrese un mail válido";
    }
    if (mensaje.trim() === "") {
      newErrors.mensaje = "Mensaje es obligatorio";
    }

    setErrors(newErrors);

    // Si no hay errores, enviar el formulario
    if (
      Object.values(newErrors).every((error) => error === "") // Comprueba si todos los valores en el objeto de errores son cadenas vacías
    ) {
      handleSubmit();
    }
  };

  const resetForm = () => {
    setNombre("");
    setTelefono("");
    setMail("");
    setMensaje("");
    setErrors({
      nombre: "",
      telefono: "",
      mail: "",
      mensaje: "",
    });
  };

  const handleSubmit = () => {
    // Agregar la lógica real para enviar la solicitud de compra
    setSnackbarOpen(true);
    resetForm();
    handleClose();
  };

  // Función para cerrar el snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Contactar a {professorName}
          </Typography>
          <TextField
            name="nombre"
            label="Nombre y Apellido"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => {
              const value = e.target.value;
              setNombre(value);
              handleFieldChange("nombre", value);
            }}
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.nombre}</span>
            }
            value={nombre}
          />
          <TextField
            name="telefono"
            label="Teléfono"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => {
              const value = e.target.value;
              setTelefono(value);
              handleFieldChange("telefono", value);
            }}
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.telefono}</span>
            }
            value={telefono}
          />
          <TextField
            label="Mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mail}
            onChange={(e) => {
              const value = e.target.value;
              setMail(value);
              handleFieldChange("mail", value);
            }}
            helperText={<span style={{ color: "#d32f2f" }}>{errors.mail}</span>}
          />
          <TextField
            label="Mensaje"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={mensaje}
            onChange={(e) => {
              const value = e.target.value;
              setMensaje(value);
              handleFieldChange("mensaje", value);
            }}
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.mensaje}</span>
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={(e) => {
              handleSend();
            }}
          >
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
          Solicitud enviada correctamente
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

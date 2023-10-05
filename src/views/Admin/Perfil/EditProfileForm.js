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

export default function EditProfileForm({ open, teacherData, handleClose }) {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: teacherData.name,
    subject: teacherData.subject,
    age: teacherData.age,
    email: teacherData.email,
    phone: teacherData.phone,
    description: teacherData.description,
    background: teacherData.background,
  });

  const [errors, setErrors] = useState({
    name: "",
    subject: "",
    age: "",
    email: "",
    phone: "",
    description: "",
    background: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Nombre es obligatorio";
    }
    if (formData.subject.trim() === "") {
      newErrors.subject = "Materia es obligatoria";
    }
    if (!/^\d+$/.test(formData.age)) {
      newErrors.age = "Ingrese un número entero";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingrese un mail Valido";
    }
    if (formData.phone.trim() === "") {
      newErrors.phone = "Teléfono es obligatorio";
    }
    if (formData.description.trim() === "") {
      newErrors.description = "Descripción es obligatoria";
    }
    if (formData.background.trim() === "") {
      newErrors.background = "Experiencia es obligatoria";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      // Lógica para enviar el formulario
      setSnackbarOpen(true);
      handleClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: teacherData.name,
      subject: teacherData.subject,
      age: teacherData.age,
      email: teacherData.email,
      phone: teacherData.phone,
      description: teacherData.description,
      background: teacherData.background,
    });

    // También debes restablecer los errores a valores iniciales si es necesario
    setErrors({
      name: "",
      subject: "",
      age: "",
      email: "",
      phone: "",
      description: "",
      background: "",
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            Editar Perfil
          </Typography>
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={<span style={{ color: "#d32f2f" }}>{errors.name}</span>}
          />
          <TextField
            label="Materia"
            name="subject"
            value={formData.subject}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.subject}</span>
            }
          />
          <TextField
            label="Edad"
            name="age"
            value={formData.age}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={<span style={{ color: "#d32f2f" }}>{errors.age}</span>}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.email}</span>
            }
          />
          <TextField
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.phone}</span>
            }
          />
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.description}</span>
            }
          />
          <TextField
            label="Experiencia"
            name="background"
            value={formData.background}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.background}</span>
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
            onClick={handleSubmit}
            fullWidth
          >
            Confirmar cambios
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleClose();
              resetForm();
            }}
            fullWidth
          >
            Cancelar cambios
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
          Se han guardado los cambios
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

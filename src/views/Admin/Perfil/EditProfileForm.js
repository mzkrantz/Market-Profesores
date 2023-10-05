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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Agregar la lógica de compra
    setSnackbarOpen(true); // Abre el snackbar
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
          />
          <TextField
            label="Materia"
            name="subject"
            value={formData.subject}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Edad"
            name="age"
            value={formData.age}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Experiencia"
            name="background"
            value={formData.background}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => {
              handleSubmit(formData);
            }}
            fullWidth
          >
            Confirmar cambios
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            fullWidth
          >
            Cancelar cambios
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
          Se han guardado los cambios
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

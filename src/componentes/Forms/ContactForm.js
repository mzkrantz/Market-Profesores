import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar,
  Typography
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";


export default function ContactForm({ open, professorName, handleClose }) {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
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
        <DialogTitle>Formulario de Compra</DialogTitle>
        <DialogContent>
        <Typography variant="h6" gutterBottom>
          Contactar a {professorName}
        </Typography>
        <TextField
          name="firstName"
          label="Nombre"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleFormChange}
          value={formData.firstName}
        />
        <TextField
          name="lastName"
          label="Apellido"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleFormChange}
          value={formData.lastName}
        />
        <TextField
          name="phone"
          label="Teléfono"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleFormChange}
          value={formData.phone}
        />
        <TextField
          name="email"
          label="Correo Electrónico"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleFormChange}
          value={formData.email}
        />
        <TextField
          name="message"
          label="Mensaje"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleFormChange}
          value={formData.message}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit(formData);
          }}
          fullWidth
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
};

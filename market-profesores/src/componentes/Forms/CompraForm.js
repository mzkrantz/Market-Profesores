import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";

export default function CompraForm({ open, handleClose }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [horario, setHorario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

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
          <TextField
            label="Nombre y Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            margin="normal"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <TextField
            label="Mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <TextField
            label="Horario de Preferencia"
            variant="outlined"
            fullWidth
            margin="normal"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
          <TextField
            label="Mensaje al Proveedor"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
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
        message="Mensaje enviado correctamente"
      />
    </div>
  );
}

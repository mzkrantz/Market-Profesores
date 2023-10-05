import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export default function CompraForm({ open, handleClose }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [horario, setHorario] = useState("Cualquiera");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState({
    nombre: "",
    telefono: "",
    mail: "",
    mensaje: "",
  });
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleSubmit = () => {
    // Agregar la lógica real para enviar la solicitud de compra
    resetForm();
    setSnackbarOpen(true);
    handleClose();
  };

  const resetForm = () => {
    setNombre("");
    setTelefono("");
    setMail("");
    setHorario("Cualquiera");
    setMensaje("");
    setErrors({
      nombre: "",
      telefono: "",
      mail: "",
      mensaje: "",
    });
  };

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
            onChange={(e) => {
              const value = e.target.value;
              setNombre(value);
              handleFieldChange("nombre", value);
            }}
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.nombre}</span>
            }
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            margin="normal"
            value={telefono}
            onChange={(e) => {
              const value = e.target.value;
              setTelefono(value);
              handleFieldChange("telefono", value);
            }}
            helperText={
              <span style={{ color: "#d32f2f" }}>{errors.telefono}</span>
            }
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

          <FormControl margin="normal" variant="outlined" fullWidth>
            <InputLabel id="horario-preferencia">
              Horario de Preferencia
            </InputLabel>
            <Select
              label="Horario de Preferencia"
              fullWidth
              margin="normal"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              <MenuItem value={"Cualquiera"}>Cualquiera</MenuItem>
              <MenuItem value="Mañana">Mañana</MenuItem>
              <MenuItem value="Tarde">Tarde</MenuItem>
              <MenuItem value="Noche">Noche</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Mensaje al Proveedor"
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

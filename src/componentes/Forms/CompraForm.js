import React, { useState } from "react";
import { enviarSolicitud } from "../../controller/miApp.controller";

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

export default function CompraForm({ open, handleClose, curso }) {
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

    if (Object.values(newErrors).every((error) => error === "")) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const formData = {
      nombre: nombre,
      telefono: telefono,
      mail: mail,
      horario: horario,
      mensaje: mensaje,
      curso: curso._id,
      cursoNombre: curso.title,
      profesor: curso.teacher,
    };

    enviarSolicitud(formData)
      .then(() => {
        resetForm();
        setSnackbarOpen(true);
        handleClose();
      })
      .catch((error) => {
        console.error("Hubo un error al enviar la solicitud:", error);
      });
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
            margin="dense"
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
            margin="dense"
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
            margin="dense"
            value={mail}
            onChange={(e) => {
              const value = e.target.value;
              setMail(value);
              handleFieldChange("mail", value);
            }}
            helperText={<span style={{ color: "#d32f2f" }}>{errors.mail}</span>}
          />

          <FormControl margin="dense" variant="outlined" fullWidth>
            <InputLabel id="horario-preferencia">
              Horario de Preferencia
            </InputLabel>
            <Select
              label="Horario de Preferencia"
              fullWidth
              margin="dense"
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
            margin="dense"
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
          Solicitud enviada correctamente. El profesor se pondrá en contacto con
          usted a la brevedad.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

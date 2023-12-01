import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { sendPasswordResetEmail } from "../../controller/miApp.controller";

const PasswordRecoveryForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(email);
      onSubmit("Se ha enviado un correo de recuperación de contraseña.");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      onSubmit("Error al enviar el correo de recuperación de contraseña.");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Recuperación de Contraseña
        </Typography>
        <TextField
          label="Correo Electrónico"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar Correo de Recuperación
        </Button>
      </form>
    </Container>
  );
};

export default PasswordRecoveryForm;

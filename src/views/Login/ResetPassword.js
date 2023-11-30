import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { resetPassword } from "../../controller/miApp.controller";
import { useParams } from "react-router-dom";

export default function ResetPassword({ match }) {
  const [formData, setFormData] = React.useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = React.useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { token: resetToken } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await resetPassword(formData.email, resetToken, formData.newPassword);
        console.log('Contraseña restablecida con éxito:', response);
        // Restablecer el formulario
        setFormData({
          email: '',
          newPassword: '',
          confirmPassword: '',
        });
        setFormErrors({
          email: '',
          newPassword: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es requerido.';
      isValid = false;
    }

    if (formData.newPassword.length < 8) {
      errors.newPassword = 'La contraseña debe tener al menos 8 caracteres.';
      isValid = false;
    }

    if (formData.confirmPassword !== formData.newPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div style={{ minHeight: "75vh" }}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Restablecer Contraseña
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Correo Electrónico"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.email}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  label="Nueva Contraseña"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.newPassword}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.confirmPassword}
                    </span>
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Restablecer Contraseña
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
}

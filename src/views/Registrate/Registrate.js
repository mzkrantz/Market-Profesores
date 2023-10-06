import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Registrate() {
  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    phone: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones.
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (formData.nombre.trim() === "") {
      errors.nombre = "El nombre es obligatorio.";
      isValid = false;
    }

    if (formData.apellido.trim() === "") {
      errors.apellido = "El apellido es obligatorio.";
      isValid = false;
    }

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "El correo electrónico no es válido.";
      isValid = false;
    }

    if (!formData.phone.match(/^\d+$/)) {
      errors.phone = "El teléfono debe contener solo números.";
      isValid = false;
    }

    if (formData.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
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
            Regístrate en EduWizard
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  autoFocus
                  value={formData.nombre}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.nombre}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.apellido}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>{formErrors.email}</span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Teléfono"
                  name="phone"
                  autoComplete="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>{formErrors.phone}</span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.password}
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
              Regístrate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
}

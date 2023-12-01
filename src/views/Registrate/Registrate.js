import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Navigate } from "react-router-dom";
import { registration } from "../../controller/miApp.controller";
import { useDropzone } from "react-dropzone";

export default function Registrate() {
  const [redirect, setRedirect] = React.useState(false);

  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    phone: "",
    password: "",
    materia: "",
    edad: "",
    descripcion: "",
    experiencia: "",
    image: null,
  });

  const [formErrors, setFormErrors] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    phone: "",
    password: "",
    materia: "",
    edad: "",
    descripcion: "",
    experiencia: "",
    image: null,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFormData((prevState) => ({ ...prevState, image: acceptedFiles[0] }));
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      registerUser(formData)
        .then((data) => {
          setRedirect(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  const registerUser = async (registedData) => {
    const formData = new FormData();

    for (let key in registedData) {
      if (registedData.hasOwnProperty(key) && registedData[key] !== null) {
        formData.append(key, registedData[key]);
      }
    }

    // Imprimir el contenido de formData
    for (var pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(
          pair[0] +
            ", " +
            pair[1].name +
            ", " +
            pair[1].size +
            ", " +
            pair[1].type
        );
      } else {
        console.log(pair[0] + ", " + pair[1]);
      }
    }

    let getRegistration = await registration(formData);

    if (getRegistration.rdo === 0) {
      alert("El usuario se registró de manera exitosa");
    } else {
      alert("El mail ingresado ya existe en nuestra base de datos");
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

    if (formData.materia.trim() === "") {
      errors.materia = "La materia es obligatoria.";
      isValid = false;
    }

    if (!formData.edad.match(/^\d+$/)) {
      errors.edad = "La edad debe contener solo números.";
      isValid = false;
    }

    if (formData.descripcion.trim() === "") {
      errors.descripcion = "La descripcion es obligatoria.";
      isValid = false;
    }

    if (formData.experiencia.trim() === "") {
      errors.experiencia = "La experiencia es obligatoria.";
      isValid = false;
    }

    if (!formData.image) {
      errors.image = "Seleccione una imagen.";
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

  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
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
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="materia"
                  label="Materia"
                  id="materia"
                  value={formData.materia}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.materia}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="edad"
                  label="Edad"
                  id="edad"
                  value={formData.edad}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>{formErrors.edad}</span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="descripcion"
                  label="Descripción"
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.descripcion}
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="experiencia"
                  label="Experiencia"
                  id="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                  helperText={
                    <span style={{ color: "#d32f2f" }}>
                      {formErrors.experiencia}
                    </span>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <div {...getRootProps()} style={dropzoneStyle}>
                  <input {...getInputProps()} />
                  <p>
                    Arrastra y suelta una imagen aquí, o haz clic para
                    seleccionar una.
                  </p>
                </div>
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

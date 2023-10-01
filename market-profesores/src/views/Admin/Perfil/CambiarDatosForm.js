import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CambiarDatosForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    age: "",
    email: "",
    phone: "",
    description: "",
    background: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cambiar Datos del Profesor
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Materia"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Edad"
          name="age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Experiencia"
          name="background"
          value={formData.background}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Guardar Cambios
        </Button>
      </form>
    </Container>
  );
};

export default CambiarDatosForm;

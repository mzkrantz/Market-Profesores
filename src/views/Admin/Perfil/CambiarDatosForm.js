import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";


const CambiarDatosForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData); // Establece los datos iniciales
  const handleFileUpload = (acceptedFiles) => {
    // Manejar la carga de archivos aquí
    const file = acceptedFiles[0];
    setFormData({ ...formData, image: file });
  };

  // Actualiza el estado de los datos iniciales cuando cambian las propiedades
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Solo permitir archivos de imagen
    onDrop: handleFileUpload,
  });
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
        {/* Campo de carga de archivos para la imagen */}
        <Typography variant="h5" gutterBottom marginTop={'2rem'}>
        Cambiar Foto de Perfil
      </Typography>
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          <p>
            Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.
          </p>
        </div>
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

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default CambiarDatosForm;

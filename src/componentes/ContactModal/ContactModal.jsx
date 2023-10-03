import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ContactModal = ({ open, onClose, professorName, handleSubmit }) => {
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

  const handleCloseModal = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Contactar a {professorName}
        </Typography>
        <TextField
          name="firstName"
          label="Nombre"
          variant="outlined"
          fullWidth
          onChange={handleFormChange}
          value={formData.firstName}
        />
        <TextField
          name="lastName"
          label="Apellido"
          variant="outlined"
          fullWidth
          onChange={handleFormChange}
          value={formData.lastName}
        />
        <TextField
          name="phone"
          label="Teléfono"
          variant="outlined"
          fullWidth
          onChange={handleFormChange}
          value={formData.phone}
        />
        <TextField
          name="email"
          label="Correo Electrónico"
          variant="outlined"
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
          fullWidth
          onChange={handleFormChange}
          value={formData.message}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit(formData);
            handleCloseModal();
          }}
          fullWidth
        >
          Enviar
        </Button>
      </Box>
    </Modal>
  );
};

export default ContactModal;

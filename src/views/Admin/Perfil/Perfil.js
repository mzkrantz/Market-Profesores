import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import CambiarDatosForm from "./CambiarDatosForm"; // Asegúrate de proporcionar la ruta correcta


// Datos del profesor (reemplazar con los datos reales) - Recuperacion de datos del JSON + Relacion usuario logueado - profesor - cursos
const teacherData = {
  name: "Ana Martínez",
  subject: "Cocina",
  age: 35,
  email: "ana.martinez@example.com",
  phone: "123456789",
  image: "https://ejemplo.com/imagenes/ana_martinez.jpg",
  description:
    "Chef profesional con pasión por la cocina internacional y la enseñanza de técnicas culinarias.",
  background:
    "Carrera en Gastronomía y experiencia en restaurantes de renombre.",
};

//Estilos
const ProfileContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileImage = styled("img")`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  border: 5px solid #007bff;
`;

const ProfileTitle = styled(Typography)`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const ProfileSubtitle = styled(Typography)`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const ProfileText = styled(Typography)`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ProfileButton = styled(Button)`
  font-size: 1.25rem;
  padding: ${({ theme }) => theme.spacing(1.5, 4)};
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.spacing(1)};
  transition: background-color 0.3s ease;
  &:hover {
    background: #0056b3;
  }
`;

const Perfil = () => {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleFormSubmit = (formData) => {
    // Aquí puedes manejar los nuevos datos del formulario, ya sea enviándolos al servidor o actualizando el estado de la aplicación.
    // Por ahora, simplemente imprime los nuevos datos en la consola.
    console.log("Nuevos datos:", formData);
    setEditing(false); // Cierra el formulario después de enviar los datos
  };
  return (
    <>
      <ProfileContainer>
      {editing ? (
          <CambiarDatosForm onSubmit={handleFormSubmit} />
        ) : (
          <>
        <ProfileImage src={teacherData.image} alt={teacherData.name} />
        <ProfileTitle variant="h1">{teacherData.name}</ProfileTitle>
        <ProfileSubtitle variant="h2">{teacherData.subject}</ProfileSubtitle>
        <ProfileText>{teacherData.age} años</ProfileText>
        <ProfileText>Email: {teacherData.email}</ProfileText>
        <ProfileText>Teléfono: {teacherData.phone}</ProfileText>
        <ProfileText>Experiencia: {teacherData.background}</ProfileText>
        <ProfileText>Descripción: {teacherData.description}</ProfileText>
        <ProfileButton variant="contained" onClick={handleEdit}>
              Cambiar Datos
            </ProfileButton>
          </>
        )}
      </ProfileContainer>
    </>
  );
};

export default Perfil;

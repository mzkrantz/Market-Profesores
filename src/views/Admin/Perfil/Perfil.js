import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import EditProfileForm from "./EditProfileForm";
import { styled } from "@mui/system";

const teacherData = {
  name: "Ana Martínez",
  subject: "Cocina",
  age: 35,
  email: "ana.martinez@example.com",
  phone: "123456789",
  image: "/img/profesores/teacher-female-1.png",
  description:
    "Chef profesional con pasión por la cocina internacional y la enseñanza de técnicas culinarias.",
  background:
    "Carrera en Gastronomía y experiencia en restaurantes de renombre.",
};

const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const ProfileImage = styled(Avatar)`
  width: 150px;
  height: 150px;
`;

const ProfileTitle = styled(Typography)`
  font-size: 2rem;
  margin-top: 16px;
`;

const ProfileSubtitle = styled(Typography)`
  font-size: 1.5rem;
  color: #666;
`;

const ProfileInfo = styled(Typography)`
  font-size: 1.25rem;
  margin: 8px 0;
`;

const ProfileButtonContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const EditButton = styled(Button)`
  margin-top: 20px;
`;
const Perfil = () => {
  const [editing, setEditing] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Manejar los nuevos datos del formulario, enviar a backend y actualizar datos del perfil
    setEditing(false); // Cierra el formulario después de enviar los datos
  };
  return (
    <>
      <ProfileContainer>
        <Paper elevation={3} style={{ padding: "32px" }}>
          {editing ? (
            <EditProfileForm
              initialData={teacherData} // Pasa los datos del perfil como propiedades
              onSubmit={handleFormSubmit}
            />
          ) : (
            <>
              <ProfileImage src={teacherData.image} alt={teacherData.name} />
              <ProfileTitle variant="h1">{teacherData.name}</ProfileTitle>
              <ProfileSubtitle variant="h2">
                {teacherData.subject}
              </ProfileSubtitle>
              <ProfileInfo>{teacherData.age} años</ProfileInfo>
              <ProfileInfo>Email: {teacherData.email}</ProfileInfo>
              <ProfileInfo>Teléfono: {teacherData.phone}</ProfileInfo>
              <ProfileInfo>Experiencia: {teacherData.background}</ProfileInfo>
              <ProfileInfo>Descripción: {teacherData.description}</ProfileInfo>
              <ProfileButtonContainer>
                <EditButton
                  variant="contained"
                  onClick={handleOpenDialog}
                  open={isDialogOpen}
                >
                  <EditIcon />
                  Cambiar Datos
                </EditButton>
              </ProfileButtonContainer>
              <EditProfileForm
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                teacherData={teacherData}
              />
            </>
          )}
        </Paper>
      </ProfileContainer>
    </>
  );
};

export default Perfil;

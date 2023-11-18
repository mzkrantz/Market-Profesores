import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import EditProfileForm from "./EditProfileForm";
import { styled } from "@mui/system";

import { profesorPorMail } from '../../../controller/miApp.controller';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [teacherData, setTeacherData] = useState(null);



  useEffect(() => {
    const fetchTeacherData = async () => {
      let response = await profesorPorMail();
      console.log("response", response);

      if (response.rdo === 0) {
        setTeacherData({
          name: response.profesor.data.name,
          subject: response.profesor.data.subject,
          age: response.profesor.data.age,
          email: response.profesor.data.email,
          phone: response.profesor.data.phone,
          image: " ",
          description: response.profesor.data.description,
          background: response.profesor.data.background,
        });
        console.log("leyo", teacherData);
      } else {
        // Maneja el error aquí
        console.log(response.mensaje);
      }
    };

    fetchTeacherData();
  }, []);

  if (!teacherData) {
    return <CircularProgress />; // Muestra el indicador de carga si teacherData es null
  }

  

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
    <><ProfileContainer>
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
        {teacherData.age && <ProfileInfo>{teacherData.age} años</ProfileInfo>}
        {teacherData.email && <ProfileInfo>Email: {teacherData.email}</ProfileInfo>}
        {teacherData.phone && <ProfileInfo>Teléfono: {teacherData.phone}</ProfileInfo>}
        {teacherData.background && <ProfileInfo>Experiencia: {teacherData.background}</ProfileInfo>}
        {teacherData.description && <ProfileInfo>Descripción: {teacherData.description}</ProfileInfo>}
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

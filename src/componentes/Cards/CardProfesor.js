import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ContactModal from "../ContactModal/ContactModal";
import BasicModal from "../Modal/ModalProfesor";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./CardStyles.css";

export default function CardProfesor(props) {
  const { image, name, description } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card
      style={{
        minHeight: "30rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardMedia
        component="img"
        className="card-image"
        src={image}
        alt="Profesor Imagen"
      />
      <CardContent>
        <div className="infoBox">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </div>
      </CardContent>
      <div className="infoBox2">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              marginBottom={1} 
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}               
                className="card-modal"
                style={{ maxWidth: "100%" }} 
              >
                Contactar
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <BasicModal
              buttonName="Conóceme"
              className="card-modal"
              professorName={name}
              description={description}
              style={{ maxWidth: "100%" }} 
            />
          </Grid>
        </Grid>
      </div>
      <ContactModal
        open={openModal}
        onClose={handleCloseModal}
        professorName={name}
      />
    </Card>
  );
}

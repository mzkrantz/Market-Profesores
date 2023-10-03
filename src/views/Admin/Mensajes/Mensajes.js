// src/Mensajes.js
import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const mensajes = [
  {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@example.com',
    mensaje: 'Estoy interesado en tus cursos, ¿cómo puedo inscribirme?',
  },
  {
    nombre: 'María',
    apellido: 'González',
    email: 'maria@example.com',
    mensaje: '¿Puedes proporcionarme más información sobre los cursos?',
  },
  // Agrega más mensajes según sea necesario
];

function Mensajes() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Mensajes recibidos de clientes
      </Typography>
      {mensajes.map((mensaje, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">
              {mensaje.nombre} {mensaje.apellido}
            </Typography>
            <Typography variant="body2">{mensaje.email}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="body1">{mensaje.mensaje}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Mensajes;

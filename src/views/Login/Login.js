import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserContext } from "../../context/userProvider";
import { Navigate } from "react-router-dom";
import PasswordRecoveryForm from "../../componentes/PasswordRecoveryForm/PasswordRecoveryForm";
import ModalCustom from "../../componentes/Modal/ModalCustom";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

//importo llamada a endpoint
import {login} from "../../controller/miApp.controller";


export default function Login() {
  const { setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPasswordRecoveryModalOpen, setIsPasswordRecoveryModalOpen] =
    useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openPasswordRecoveryModal = () => {
    setIsPasswordRecoveryModalOpen(true);
  };

  const closePasswordRecoveryModal = () => {
    setIsPasswordRecoveryModalOpen(false);
  };

    //Ejecuto el endopoint para validar login
    const validarLogin= async function(a,b )
    {
      let datos = {
          email: a,
          password:b
        }
      let getLogin = await login(datos);

      if (getLogin.rdo===0 )
      {
        setUser(true);
        setLoggedIn(true);
      }
      if (getLogin.rdo===1)
      {
        alert("El usuario no es valido")
      }      
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (loggedIn) {
      // Lógica de recuperación de contraseña
    } else {

      if (email!=="" && password!=="") {
        validarLogin(email,password);        
        
      } else {
        // Acceso denegado, muestra un mensaje de error
        alert("Usuario o contraseña incorrectos");
      }
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    closePasswordRecoveryModal(); // Cierra el modal cuando se muestra el Snackbar
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

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
            Ingresá a tu cuenta
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={openPasswordRecoveryModal}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <ModalCustom
        open={isPasswordRecoveryModalOpen}
        onClose={closePasswordRecoveryModal}
      >
        <PasswordRecoveryForm onSubmit={handleSnackbarOpen} />
      </ModalCustom>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

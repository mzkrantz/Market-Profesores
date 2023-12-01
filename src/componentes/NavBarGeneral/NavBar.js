import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Hidden,
  IconButton,
} from "@mui/material";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userProvider";
import LogoWizard from "../LogoWizard/LogoWizard";
import UserMenu from "./UserMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { obtenerImagenUsuario } from "../../controller/miApp.controller";

import "./NavBarStyles.css";

const StyledAvatar = styled(Avatar)({
  cursor: "pointer",
  width: 40,
  height: 40,
  fontSize: 16,
});

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setShouldNavigate(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserImage = async () => {
      if (user) {
        try {
          const response = await obtenerImagenUsuario();
          setUserImage(response.imagen);
        } catch (error) {
          console.error("Error obteniendo la imagen del usuario:", error);
        }
      } else {
        setUserImage(null);
      }
    };

    fetchUserImage();
  }, [user]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
    setShouldNavigate(true);
  };

  const handleConfirmLogout = () => {
    setUser(null);
    localStorage.clear();
    setLogoutDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar className="navbar-toolbar">
          <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
            <div className="navbar-logo">
              <LogoWizard width={50} height={50} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="navbar-title"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                EDUWIZARD
              </Typography>
            </div>
          </NavLink>

          <div className="button-holder">
            <Button
              color="inherit"
              component={NavLink}
              to="/Cursos"
              style={{ textDecoration: "none", color: "white" }}
              className="navbar-button"
            >
              Cursos
            </Button>

            <Button
              color="inherit"
              component={NavLink}
              to="/Profesores"
              style={{ textDecoration: "none", color: "white" }}
              className="navbar-button"
            >
              Profesores
            </Button>
          </div>

          <Box className="navbar-avatar">
            <Hidden smUp>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleProfileMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {user ? (
                <StyledAvatar onClick={handleProfileMenuOpen} src={userImage}>
                  {user && user.name ? user.name.charAt(0) : "U"}
                </StyledAvatar>
              ) : (
                <StyledAvatar onClick={handleProfileMenuOpen} />
              )}
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>

      <UserMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        user={user}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
      />

      <Dialog open={isLogoutDialogOpen} onClose={handleCancelLogout}>
        <DialogTitle>Cerrar sesión:</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas cerrar sesión?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>

      {shouldNavigate && <Navigate to="/" />}
    </Box>
  );
};

export default NavBar;

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
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userProvider";
import LogoWizard from "../LogoWizard/LogoWizard";
import UserMenu from "./UserMenu";
import "./NavBarStyles.css";

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 16px;
`;

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

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
  };

  const handleConfirmLogout = () => {
    setUser(null);
    setLogoutDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="navbar" // Aplica la clase CSS a la barra de navegación
      >
        <Toolbar className="navbar-toolbar">
          
          <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
            <div className="navbar-logo">
              <LogoWizard width={50} height={50} />
              {"     "}
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="navbar-title"
              >
                EDUWIZARD
              </Typography>
            </div>
          </NavLink>

          <div className="button-holder">
            <NavLink
              to="/Cursos"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Cursos</Button>
            </NavLink>

            <NavLink
              to="/Profesores"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Profesores</Button>
            </NavLink>
          </div>

          <Box className="navbar-avatar" sx={{ display: { xs: "block", md: "flex" } }}>
            {user ? (
              <StyledAvatar onClick={handleProfileMenuOpen}>
                {user.name ? user.name.charAt(0) : "U"}
              </StyledAvatar>
            ) : (
              <StyledAvatar onClick={handleProfileMenuOpen} />
            )}
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
    </Box>
  );
}

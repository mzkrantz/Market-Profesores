import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

export default function UserMenu(props) {
  const { anchorEl, isMenuOpen, user, handleMenuClose, handleLogout } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        [
          <MenuItem key="profile" component={Link} to="/Perfil" style={{ textDecoration: "none", color: "black" }}>
            Mi Perfil
          </MenuItem>,
          <MenuItem key="courses" component={Link} to="/MisCursos" style={{ textDecoration: "none", color: "black" }}>
            Mis Cursos
          </MenuItem>,
          <MenuItem key="requests" component={Link} to="/Solicitudes" style={{ textDecoration: "none", color: "black" }}>
            Solicitudes
          </MenuItem>,
          <MenuItem key="comments" component={Link} to="/Comentarios" style={{ textDecoration: "none", color: "black" }}>
            Comentarios
          </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            Cerrar Sesión
          </MenuItem>,
        ]
      ) : (
        [
          <MenuItem key="login" component={NavLink} to="/Login" style={{ textDecoration: "none", color: "black" }}>
            Ingresá
          </MenuItem>,
          <MenuItem key="register" component={NavLink} to="/Registrate" style={{ textDecoration: "none", color: "black" }}>
            Registrate
          </MenuItem>,
        ]
      )}
    </Menu>
  );
}

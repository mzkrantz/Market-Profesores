import React from "react";
import {
  Menu,
  MenuItem,
} from "@mui/material";
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
        <>
          <Link to="/Perfil" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>Mi Perfil</MenuItem>
          </Link>
          <Link
            to="/MisCursos"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>Mis Cursos</MenuItem>
          </Link>
          <Link
            to="/Solicitudes"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>Solicitudes</MenuItem>
          </Link>
          <Link
            to="/Comentarios"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>Comentarios</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </>
      ) : (
        <>
          <NavLink to="/Login" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem onClick={handleMenuClose}>Ingresá</MenuItem>
          </NavLink>
          <NavLink to="/Registrate" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem onClick={handleMenuClose}>Registrate</MenuItem>
          </NavLink>
        </>
      )}
    </Menu>
  );
}


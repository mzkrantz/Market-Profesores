import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react"; 
import { UserContext } from "../../context/userProvider";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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

  const CustomSpacing = styled("div")({
    marginRight: "50px", 
  });

  const menuId = "primary-search-account-menu";

  const MenuPerfil = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
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
            <MenuItem style={{ textDecoration: "none", color: "none"}}>
              Mi Perfil
            </MenuItem>
          </Link>
          <Link
            to="/MisCursos"
            style={{ textDecoration: "none", color: "black  " }}
          >
            <MenuItem style={{ textDecoration: "none", color: "none"}}>
              Mis Cursos
            </MenuItem>
          </Link>
          <Link
            to="/Mensajes"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem style={{ textDecoration: "none", color: "none"}}>
              Mensajes
            </MenuItem>
          </Link>
          <Link
            to="/Comentarios"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem style={{ textDecoration: "none", color: "none"}}>
              Comentarios
            </MenuItem>
          </Link>
          <MenuItem
            onClick={handleLogout}
            style={{ textDecoration: "none", color: "black"}}
          >
            Cerrar Sesion
          </MenuItem>
        </>
      ) : (
        <>
          <NavLink
            to="/Login"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleMenuClose}>Ingresá</MenuItem>
          </NavLink>
          <NavLink
            to="/Registrate"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleMenuClose}>Registrate</MenuItem>
          </NavLink>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ minHeight: "5vh", justifyContent: "center" }}
      >
        <Toolbar>
        <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              underline="none"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <CustomSpacing> {/* Agrega espaciado */}
                Eduwizard
              </CustomSpacing>
            </Typography>
          </NavLink>
          

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

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar onClick={handleProfileMenuOpen}>U</Avatar>
            </IconButton>
          </Box>

          {/* Versión móvil */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {MenuPerfil}

      
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

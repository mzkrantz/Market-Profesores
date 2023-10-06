import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import LogoWizard from "../../componentes/LogoWizard/LogoWizard";
import "./MainStyles.css"; // Importa los estilos CSS

function Main() {
  const HeroTitle = styled(Typography)`
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  `;

  const HeroText = styled(Typography)`
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  `;

  return (
    <>
      <header className="hero-section">
        <Container>
          <LogoWizard width={300} height={300} className="logo" />
          <HeroTitle variant="h1" className="hero-title">
            BIENVENIDO A EDUWIZARD
          </HeroTitle>
          <HeroText variant="body1" className="hero-text">
            Como expertos en la educación, ofrecemos clases particulares de
            matemáticas, lengua, ciencias y otras asignaturas para estudiantes
            de todas las edades, desde la primaria hasta la universidad.
          </HeroText>
          <Link to="/Cursos" style={{ textDecoration: "none", color: "white" }}>
            <Button variant="contained" component="a" className="cursos-button">
              Explorar Cursos
            </Button>
          </Link>
        </Container>
      </header>
    </>
  );
}

export default Main;

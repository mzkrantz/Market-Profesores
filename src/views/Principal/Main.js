import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
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

  const AboutTitle = styled(Typography)`
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    text-align: center;
  `;

  const AboutText = styled(Typography)`
    font-size: 1.25rem;
    text-align: center;
  `;

  const FeatureTitle = styled(Typography)`
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    text-align: center;
  `;

  const FeatureText = styled(Typography)`
    font-size: 1.25rem;
    text-align: center;
  `;

  const TestimonialTitle = styled(Typography)`
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    text-align: center;
  `;

  const TestimonialText = styled(Typography)`
    font-size: 1.25rem;
    text-align: center;
  `;
  return (
    <>
      <header className="hero-section">
        <Container>
          <LogoWizard width={300} height={300} className="logo" />
          <HeroTitle variant="h1" className="hero-title">
            Bienvenido a EDUWIZARD
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

      <section className="about-section">
        <Container>
          <AboutTitle variant="h2" className="about-title">
            Tu portal a un mundo de aprendizaje personalizado
          </AboutTitle>
          <AboutText variant="body1" className="about-text">
            En EDUWIZARD, creemos en la educación personalizada. Nuestros cursos
            están diseñados para ayudarte a alcanzar tus objetivos de
            aprendizaje de la manera que mejor funcione para ti.
          </AboutText>
        </Container>
      </section>

      <section className="features-section">
        <Container>
          <FeatureTitle variant="h2" className="feature-title">
            Nuestras Características
          </FeatureTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} className="feature-item">
              <div className="feature-icon">1</div>
              <FeatureText className="feature-text">
                Amplia variedad de cursos para elegir.
              </FeatureText>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="feature-item">
              <div className="feature-icon">2</div>
              <FeatureText className="feature-text">
                Profesores altamente calificados.
              </FeatureText>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="feature-item">
              <div className="feature-icon">3</div>
              <FeatureText className="feature-text">
                Aprendizaje interactivo y práctico.
              </FeatureText>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className="testimonials-section">
        <Container>
          <TestimonialTitle variant="h2" className="testimonial-title">
            Lo que dicen nuestros estudiantes
          </TestimonialTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} className="testimonial-item">
              <TestimonialText className="testimonial-text">
                "Gracias a EDUWIZARD, pude mejorar mis habilidades en
                matemáticas y obtener calificaciones excelentes en mis exámenes.
                ¡Altamente recomendado!"
              </TestimonialText>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="testimonial-item">
              <TestimonialText className="testimonial-text">
                "La plataforma es fácil de usar, y los profesores son muy
                accesibles. Me ayudó a superar mis dificultades en química."
              </TestimonialText>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="testimonial-item">
              <TestimonialText className="testimonial-text">
                "EDUWIZARD ofrece una amplia variedad de cursos, lo que me
                permitió explorar nuevos temas y desarrollar nuevas
                habilidades."
              </TestimonialText>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default Main;

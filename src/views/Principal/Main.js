import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";

/* Cambiar imagen de fondo */
const Hero = styled("header")`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("imagen-de-fondo.jpg");
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: ${({ theme }) => theme.spacing(12, 0)};
  text-align: center;
`;

const HeroTitle = styled(Typography)`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const HeroText = styled(Typography)`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const CTAButton = styled(Button)`
  font-size: 1.25rem;
  padding: ${({ theme }) => theme.spacing(1.5, 4)};
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.spacing(1)};
  transition: background-color 0.3s ease;
  &:hover {
    background: #0056b3;
  }
`;

const About = styled("section")`
  background: #f8f8f8;
  padding: ${({ theme }) => theme.spacing(8, 0)};
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

const Features = styled("section")`
  background: #fff;
  padding: ${({ theme }) => theme.spacing(8, 0)};
`;

const FeatureTitle = styled(Typography)`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const FeatureItem = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(0, 2)};
`;

const FeatureIcon = styled("div")`
  font-size: 3rem;
  color: #007bff;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FeatureText = styled(Typography)`
  font-size: 1.25rem;
  text-align: center;
`;

const Testimonials = styled("section")`
  background: #f8f8f8;
  padding: ${({ theme }) => theme.spacing(8, 0)};
`;

const TestimonialTitle = styled(Typography)`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const TestimonialItem = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(0, 2)};
`;

const TestimonialText = styled(Typography)`
  font-size: 1.25rem;
  text-align: center;
`;

function Main() {
  return (
    <>
      <Hero>
        <Container>
          <HeroTitle variant="h1">Bienvenido a EDUWIZARD</HeroTitle>
          <HeroText variant="body1">
            Como expertos en la educación, ofrecemos clases particulares de
            matemáticas, lengua, ciencias y otras asignaturas para estudiantes
            de todas las edades, desde la primaria hasta la universidad.
          </HeroText>
          <CTAButton variant="contained" component="a" href="/Cursos">
            Explorar Cursos
          </CTAButton>
        </Container>
      </Hero>

      <About>
        <Container>
          <AboutTitle variant="h2">
            Tu portal a un mundo de aprendizaje personalizado
          </AboutTitle>
          <AboutText variant="body1">
            En EDUWIZARD, creemos en la educación personalizada. Nuestros cursos
            están diseñados para ayudarte a alcanzar tus objetivos de
            aprendizaje de la manera que mejor funcione para ti.
          </AboutText>
        </Container>
      </About>

      <Features>
        <Container>
          <FeatureTitle variant="h2">Nuestras Características</FeatureTitle>
          <Grid container spacing={3}>
            <FeatureItem item xs={12} sm={6} md={4}>
              <FeatureIcon>1</FeatureIcon>
              <FeatureText>Amplia variedad de cursos para elegir.</FeatureText>
            </FeatureItem>
            <FeatureItem item xs={12} sm={6} md={4}>
              <FeatureIcon>2</FeatureIcon>
              <FeatureText>Profesores altamente calificados.</FeatureText>
            </FeatureItem>
            <FeatureItem item xs={12} sm={6} md={4}>
              <FeatureIcon>3</FeatureIcon>
              <FeatureText>Aprendizaje interactivo y práctico.</FeatureText>
            </FeatureItem>
          </Grid>
        </Container>
      </Features>

      <Testimonials>
        <Container>
          <TestimonialTitle variant="h2">
            Lo que dicen nuestros estudiantes
          </TestimonialTitle>
          <Grid container spacing={3}>
            <TestimonialItem item xs={12} sm={6} md={4}>
              <TestimonialText>
                "Gracias a EDUWIZARD, pude mejorar mis habilidades en
                matemáticas y obtener calificaciones excelentes en mis exámenes.
                ¡Altamente recomendado!"
              </TestimonialText>
            </TestimonialItem>
            <TestimonialItem item xs={12} sm={6} md={4}>
              <TestimonialText>
                "La plataforma es fácil de usar, y los profesores son muy
                accesibles. Me ayudó a superar mis dificultades en química."
              </TestimonialText>
            </TestimonialItem>
            <TestimonialItem item xs={12} sm={6} md={4}>
              <TestimonialText>
                "EDUWIZARD ofrece una amplia variedad de cursos, lo que me
                permitió explorar nuevos temas y desarrollar nuevas
                habilidades."
              </TestimonialText>
            </TestimonialItem>
          </Grid>
        </Container>
      </Testimonials>
    </>
  );
}

export default Main;

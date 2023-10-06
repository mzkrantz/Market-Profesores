import React from "react";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

/* Se colocan los estilos utilizando styled */
const FooterContainer = styled("footer")`
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
`;
const FooterText = styled(Typography)`
  font-size: 0.8rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FooterText variant="body2">
          &copy; {new Date().getFullYear()} EDUWIZARD. Todos los derechos
          reservados.
        </FooterText>
      </Container>
    </FooterContainer>
  );
}

export default Footer;

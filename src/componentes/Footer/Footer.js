import React from 'react';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const FooterContainer = styled('footer')`
  background-color: #333;
  color: #fff;
  padding: 2rem 0;
  margin-top: 2rem;
  text-align: center;
  max-height: 10vh;
`;

const FooterText = styled(Typography)`
  font-size: 1rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FooterText variant="body2">
          &copy; {new Date().getFullYear()} EDUWIZARD. Todos los derechos reservados.
        </FooterText>
      </Container>
    </FooterContainer>
  );
}

export default Footer;

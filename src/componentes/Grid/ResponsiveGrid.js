import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./ItemStyles.css";

/* Elemento Grid Responsive para poder ubicar las card y personalizarlo */

/* Se colocan los estilos utilizando styled */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#F5F5F5",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function ResponsiveGrid({ cardComponent, cards }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {cards.map((card) => (
          <Grid item xs={2} sm={4} md={4} key={card.id}>
            <Item className="card-item">
              {React.createElement(cardComponent, {
                ...card,
                className: "tarjeta",
              })}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

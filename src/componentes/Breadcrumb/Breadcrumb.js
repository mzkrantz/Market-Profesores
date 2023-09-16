import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";



export default function CustomSeparator(props) {
  const children = props.children;
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" to="/">
          EDUWIZARD
        </Link>
        <Typography key="2" color="text.primary">
          {children}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
}

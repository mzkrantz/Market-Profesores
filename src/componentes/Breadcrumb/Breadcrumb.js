import React from 'react';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb({ items }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Si se proporcionan elementos personalizados
  if (items && items.length > 0) {
    return (
      <Stack spacing={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" style={{ margin: '1rem' }}>
          {items.map((item, index) => (
            <span key={index}>
              <Link to={item.link} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            </span>
          ))}
        </Breadcrumbs>
      </Stack>
    );
  } else { // Si no se proporcionan elementos personalizados, genera automaticamente el breadcrumb
    return (
      <Stack spacing={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" style={{ margin: '1rem' }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            EDUWIZARD
          </Link>
          {pathnames.map((name, index) => (
            <span key={index}>
              <Link to={`/${pathnames.slice(0, index + 1).join('/')}`} style={{ textDecoration: "none" }}>
                {name}
              </Link>
            </span>
          ))}
        </Breadcrumbs>
      </Stack>
    );
  }
}

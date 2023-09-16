import PrimarySearchAppBar from "../../componentes/NavNarGeneral/NavBar";
import CustomSearch from "../../componentes/Profesores/CustomSearch/CustomSearch";
import { Cartel } from "../../componentes/Profesores/Titulo/CartelProfesores";
import "./ProfesoresStyle.css";
import CardProfesores from "../../componentes/Profesores/CardProfesores/Card";
import Pagination from "@mui/material/Pagination";
import CustomSeparator from "../../componentes/Breadcrumb/Breadcrumb";

export default function Profesores() {
  return (
    <>
      <PrimarySearchAppBar />
      <CustomSeparator> Profesores </CustomSeparator>  
      
      <Cartel />
      <div className="customSearch">
        <CustomSearch />
      </div>
      <div className="cardProfesores">
        <CardProfesores className="tarjeta" />
        <CardProfesores className="tarjeta" />
        <CardProfesores className="tarjeta" />
        <CardProfesores className="tarjeta" />
        <CardProfesores className="tarjeta" />
        <CardProfesores className="tarjeta" />
      </div>
      <div>
        <Pagination count={2} shape="rounded" />
      </div>
    </>
  );
}

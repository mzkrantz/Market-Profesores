import PrimarySearchAppBar from "../../componentes/NavNarGeneral/NavBar";
import "./ProfesoresStyle.css";
import Pagination from "@mui/material/Pagination";
import CustomSeparator from "../../componentes/Breadcrumb/Breadcrumb";
import CardProfesor from "../../componentes/Cards/CardProfesor";
import {profesores} from "../../data/profesores.json"

export default function Profesores() {
  return (
    <>
      <PrimarySearchAppBar />
      <CustomSeparator> Profesores </CustomSeparator>  
      
   
      <div className="cardProfesores">
        <CardProfesor />

      </div>
      <div>
        <Pagination count={2} shape="rounded" />
      </div>
    </>
  );
}

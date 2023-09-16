import PrimarySearchAppBar from "../../componentes/NavNarGeneral/NavBar";
import CustomSearch from "../../componentes/Profesores/CustomSearch/CustomSearch";
import { Cartel } from "../../componentes/Profesores/Titulo/CartelProfesores";
import { TituloProfesores } from "../../componentes/Profesores/Titulo/TituloProfesores";
import "./ProfesoresStyle.css";

export default function Profesores() {
  return (
    <>
      <PrimarySearchAppBar />
      <TituloProfesores />
      <Cartel />
      <div className="customSearch">
      <CustomSearch />
      </div>

      

    </>
  );
}

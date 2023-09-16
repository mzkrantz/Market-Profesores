import { CartelCursos } from "../../componentes/Cursos/TituloCursos/CartelCursos";
import { TituloCursos } from "../../componentes/Cursos/TituloCursos/TituloCursos";
import PrimarySearchAppBar from "../../componentes/NavNarGeneral/NavBar";
export default function Cursos() {
  return (
    <>
    <PrimarySearchAppBar />
    <TituloCursos />
    <CartelCursos />

    </>
  );
}

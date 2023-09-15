import PrimarySearchAppBar from "../NavNarGeneral/NavBar";
import ImgMediaCard from "./CardProfesor";
import "./Cursos.css";

export default function Cursos() {
  return (
    <div>
      <PrimarySearchAppBar />
      <div className="breadcrumb">
        <div className="link">EDUWIZARD {">"} </div>
        <div className="h">Cursos</div>
      </div>
      <div className="label">
        <div className="text-wrapper">CURSOS</div>
      </div>
      <div className="card">
        <>
        <ImgMediaCard />
        <ImgMediaCard />
        </>
              
        </div>
    </div>
  );
}

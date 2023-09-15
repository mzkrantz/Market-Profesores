import PrimarySearchAppBar from "../NavBar";
import ActionAreaCard from "./Card";
import { CustomFormGroup } from "./CustomSearch/CustomSearch";
import "./style.css";

export default function Profesores() {
  return (
    <>
      <PrimarySearchAppBar />
      <div className="profesores">
        <div className="div">
          <div className="text-wrapper">PROFESORES</div>
          <div className="breadcrumb">
            <div className="link">EDUWIZARD {' >'} </div>            
            <div className="h">Profesores</div>
          </div>
          <CustomFormGroup />
          <div className="card-wrapper">
          <ActionAreaCard />
            </div>
          
        
        </div>
      </div>
    </>
  );
}

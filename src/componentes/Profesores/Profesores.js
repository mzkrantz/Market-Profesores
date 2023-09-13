import PrimarySearchAppBar from "../NavBar";
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
            <div className="link">EDUWIZARD</div>
            <img
              className="topcoat-next-light"
              alt="Topcoat next light"
              src="topcoat-next-light.svg"
            />
            <div className="h">Profesores</div>
          </div>
          <CustomFormGroup />
        </div>
      </div>
    </>
  );
}

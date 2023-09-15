import React from "react";
import "./CustomSearch.css";

export const CustomFormGroup = () => {
  return (
    <div className="custom-form-group">
      <div className="input-group">
        <div className="form-control-input">
          <input className="search"></input>
        </div>
        <div className="input-group-append">
          <div className="dropdown">
            <div className="dropdown-toggle">
              <div className="category">Categoria</div>
              <img className="vector" alt="Vector" src="image.svg" />
            </div>
          </div>
        </div>
        <div className="input-group-append">
          <div className="dropdown">
            <div className="dropdown-toggle">
              <div className="category">Popularidad</div>
              <img className="vector" alt="Vector" src="vector.svg" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

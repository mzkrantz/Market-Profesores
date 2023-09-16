import React from "react";
import "./CustomSearch.css";
import { Input } from "@mui/material";

export default function InputGroup(){
    return (
        <div className="input-group">
            <div className="form-control-input">
                <Input placeholder="Buscar" variant="solid" />
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
                    </div>
                </div>
            </div>
            <img className="img" alt="Input group append" src="input-group-append.svg" />
        </div>
    );
};

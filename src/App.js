import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Principal/Main";
import Profesores from "./views/Profesores/Profesores";
import Cursos from "./views/Cursos/Cursos";
import CursoIndividual from "./views/Cursos/CursoIndividual";
import Login from "./views/Login/Login";
import Registrate from "./views/Registrate/Registrate";
import Footer from "./componentes/Footer/Footer";
import CustomNavBar from "./componentes/NavBarGeneral/NavBar";

function App() {
  return (
    <BrowserRouter>
      <CustomNavBar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Profesores" element={<Profesores />} />
          <Route path="/Cursos" element={<Cursos />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registrate" element={<Registrate />} />
          <Route
            path="/Cursos/CursoIndividual/:id"
            element={<CursoIndividual />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

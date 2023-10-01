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
import MisCursos from "./views/Admin/Cursos/MisCursos";
import Mensajes from "./views/Admin/Mensajes/Mensajes";
import Perfil from "./views/Admin/Perfil/Perfil";
import Comentarios from "./views/Admin/Comentarios/Comentarios";

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
          <Route path="/MisCursos" element={<MisCursos />} />
          <Route path="/Mensajes" element={<Mensajes />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Comentarios" element={<Comentarios />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

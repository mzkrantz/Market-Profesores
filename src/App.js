import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './componentes/Main';
import Profesores from './componentes/Profesores/Profesores';
import Cursos from './componentes/Cursos/Cursos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Profesores" element={<Profesores/>} />
      <Route path="/Cursos" element={<Cursos/>} />
      
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;

import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './views/Principal/Main';
import Profesores from './views/Profesores/Profesores';
import Cursos from './views/Cursos/Cursos';
import Login from './views/Login/Login';
import Registrate from './views/Registrate/Registrate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Profesores" element={<Profesores/>} />
      <Route path="/Cursos" element={<Cursos/>} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Registrate" element={<Registrate/>  } />
      
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;

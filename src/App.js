import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './componentes/Main';
import Profesores from './componentes/Profesores/Profesores';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Profesores" element={<Profesores/>} />
      
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;

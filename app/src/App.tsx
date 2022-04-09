import React from 'react';
import './App.css';
import { NavBar } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Contacto, Inicio } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

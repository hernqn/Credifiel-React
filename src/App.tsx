import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/NavBar/Navbar';
import CarruselEmpresa from './components/Carrusel/carrusel';

function App() {
  return (
    <div className="app">
      <Navbar />
      <CarruselEmpresa />
      <Dashboard />
    </div>
  );
} 

export default App;

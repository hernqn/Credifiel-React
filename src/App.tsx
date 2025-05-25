import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Chatbot from './components/chatbot1/chatbot';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        {/* Chatbot flotante disponible en todas las páginas */}
        <Chatbot companyName="Credifiel" />
      </div>
    </Router>
  );
}

export default App;
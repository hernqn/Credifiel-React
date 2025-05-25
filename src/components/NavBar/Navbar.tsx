import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { FaUserCircle, FaChartBar, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="https://cdn2.hubspot.net/hubfs/2741331/logo_logo.png" alt="Logo" />
                </Link>
            </div>
            
            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className="nav-link">Inicio</Link>
                <Link to="/servicios" className="nav-link">Servicios</Link>
                <Link to="/nosotros" className="nav-link">Nosotros</Link>
                <Link to="/contacto" className="nav-link">Contacto</Link>
                <Link to="/dashboard" className="nav-link dashboard-link">
                    <FaChartBar className="dashboard-icon" />
                    Dashboard
                </Link>
            </div>

            <div className="navbar-users">
                <FaUserCircle className="user-icon" />
            </div>
        </nav>
    );
};

export default Navbar;

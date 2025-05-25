import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { FaUserCircle, FaChartBar, FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
    userEmail: string;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userEmail, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userName = userEmail.split('@')[0]; // Obtiene el nombre del usuario del email

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

            <div className="user-menu">
                <button 
                    className="user-button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <div className="user-avatar">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="user-name">{userName}</span>
                    <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
                </button>

                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-header">
                            <strong>{userName}</strong>
                            <small>{userEmail}</small>
                        </div>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={() => {}}>
                            Mi Perfil
                        </button>
                        <button className="dropdown-item" onClick={() => {}}>
                            Configuración
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item logout" onClick={onLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

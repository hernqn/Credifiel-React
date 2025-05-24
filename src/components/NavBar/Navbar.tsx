import React from "react";
import './Navbar.css';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="https://cdn2.hubspot.net/hubfs/2741331/logo_logo.png" alt="Logo" />
            </div>
            <div className="navbar-users">
                <FaUserCircle className="user-icon" />
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import '../styles/header.css'; // Ensure you create this CSS file
import logo from '../assets/logobg.png';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="header-text">
                <p>© 2024 SIG SMART. All rights reserved.</p>
                <p>Your trusted partner in intelligent systems and data solutions.</p>
            </div>
        </header>
    );
};

export default Header;

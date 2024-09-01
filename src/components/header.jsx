import React from 'react';
import '../styles/header.css'; // Ensure you create this CSS file
import logo from'../assets/logobg.png';
const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        </header>
    );
};

export default Header;

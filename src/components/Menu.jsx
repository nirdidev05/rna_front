import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTachometerAlt, faChartLine, faMapMarkerAlt, faListAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu-container">
            <div className="menu-header" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faTachometerAlt} />
                <span>Dashboard</span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="chevron-icon" />
            </div>
            {isOpen && (
                <ul className="menu-list">
                    <li><Link to="/les-statistiques"><FontAwesomeIcon icon={faChartLine} className="menu-icon" /> Les Statistiques</Link></li>
                    <li><Link to="/map"><FontAwesomeIcon icon={faMapMarkerAlt} className="menu-icon" /> MAP</Link></li>
                    <li><Link to="/liste-adresses"><FontAwesomeIcon icon={faListAlt} className="menu-icon" /> Liste d’adresses</Link></li>
                    <li><Link to="/etat-communes"><FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" /> Etat des Communes</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Menu;

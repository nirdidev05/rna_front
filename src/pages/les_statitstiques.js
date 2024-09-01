import React from 'react';
import StatistiquesPieChart from '../components/StatistiquesPieChart';
import '../styles/Statistiques.css';

const Statistiques = () => {
    return (
        <div className="statistiques-container">
            <div className="search-bar">
                <input type="text" placeholder="Hinted search text" />
                <button>🔍</button>
            </div>
            <div className="content">
                <div className="pie-chart">
                    <StatistiquesPieChart />
                </div>
                <div className="cards">
                    <div className="card">
                        <h3>À l'étude</h3>
                        <p>XXXXX</p>
                    </div>
                    <div className="card">
                        <h3>Les adresses non validées</h3>
                        <p>XXXXX</p>
                    </div>
                    <div className="card">
                        <h3>Les adresses enregistrées</h3>
                        <p>XXXXX</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistiques;

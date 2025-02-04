import React, { useContext } from 'react';
import { StatsContext } from '../contexts/StatsContext';
import '../styles/Statistiques.css';
import Layout from '../components/Layout';
import CommuneDropdown from '../components/DropDown';
import CommuneBarChart from '../components/CommuneBarChart';
import AddressBarChart from '../components/AddressBarChart';
import ValidInvalidPieChart from '../components/ValidInvalidPieChart';

const Statistics = () => {
    const { communes, selectedCommune, getAggregatedStats } = useContext(StatsContext);

    const displayStats = selectedCommune || getAggregatedStats();

    return (
        <Layout>
            <div className="scrollable-container">
                <div className="dropdown">
                    <CommuneDropdown />
                </div>
                <div className="statistics-container">
                    <div className="card" style={{ backgroundColor: '#181442' }}>
                        <div className="card-title" style={{ color: 'white' }}>À l'étude</div>
                        <div className="card-number" style={{ color: 'white' }}>{displayStats.studyCount}</div>
                        <div className="card-circle" style={{ borderColor: 'blue' }}></div>
                    </div>
                    <div className="card" style={{ backgroundColor: '#181442' }}>
                        <div className="card-title" style={{ color: 'white' }}>Non validé</div>
                        <div className="card-number" style={{ color: 'red' }}>{displayStats.invalidCount}</div>
                        <div className="card-circle" style={{ borderColor: 'blue' }}></div>
                    </div>
                    <div className="card" style={{ backgroundColor: '#181442' }}>
                        <div className="card-title" style={{ color: 'white' }}>Validé</div>
                        <div className="card-number" style={{ color: 'green' }}>{displayStats.validCount}</div>
                        <div className="card-circle" style={{ borderColor: 'blue' }}></div>
                    </div>
                    <div className="pie-chart-wrapper">
                        <ValidInvalidPieChart />
                    </div>
                </div>
                <div className="scroll-container">
                    <div className="scroll-item">
                        <div className="bar-chart-wrapper">
                            <AddressBarChart />
                        </div>
                    </div>
                </div>
                <div className="scroll-container">
                    <div className="scroll-item">
                        <div className="bar-chart-wrapper">
                            <CommuneBarChart data={communes} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Statistics;

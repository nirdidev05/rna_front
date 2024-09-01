import React, { useState, useContext, useMemo } from 'react';
import Layout from '../components/Layout.jsx';
import EtatCommuneSearchBar from '../components/SearchBar2.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AddressContext } from '../contexts/EtatCommuneAdresse.js';
import '../styles/Etat_Commune.css';

const EtatCommunesPage = () => {
    const { refusedAddressesData } = useContext(AddressContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('numero');
    const [refusedAddresses, setRefusedAddresses] = useState([]);
    const [showCard, setShowCard] = useState(false);
    const navigate = useNavigate();

    const filteredAddresses = useMemo(() => {
        if (!refusedAddressesData) return [];

        return refusedAddressesData.filter(row => {
            if (filterType === 'numero') {
                return row.numero.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (filterType === 'commune') {
                return row.commune.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return true;
        });
    }, [searchTerm, filterType, refusedAddressesData]);

    const handleRefuseClick = (addresses) => {
        setRefusedAddresses(addresses || []);
        setShowCard(true);
    };

    const handleCloseCard = () => {
        setShowCard(false);
    };

    if (!refusedAddressesData) return <div>Loading...</div>;

    return (
        <Layout>
            <div className="etat-communes-page">
                <EtatCommuneSearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    filterType={filterType} 
                    setFilterType={setFilterType} 
                />
                <table className="etat-communes-table">
                    <thead>
                        <tr>
                            <th>Numéro Adresse</th>
                            <th>Commune</th>
                            <th>Enregistrée</th>
                            <th>Refusée</th>
                            <th>Valide</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAddresses.map((row) => (
                            <tr key={row.numero}>
                                <td>{row.numero}</td>
                                <td>{row.commune}</td>
                                <td>
                                    <FontAwesomeIcon icon={faCheckCircle} className="icon-enregistree" />
                                </td>
                                <td>
                                    {row.refuse ? (
                                        <span 
                                            className="clickable" 
                                            onClick={() => handleRefuseClick(row.refusees || [])}
                                        >
                                            <FontAwesomeIcon icon={faTimesCircle} className="icon-refuse" />
                                        </span>
                                    ) : '-'}
                                </td>
                                <td>
                                    {row.valide ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="icon-valide" />
                                    ) : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showCard && (
                    <div className="overlay">
                        <div className="card">
                            <button className="close-button" onClick={handleCloseCard}>✖</button>
                            <h3>Adresses Refusées</h3>
                            <ul>
                                {refusedAddresses.map((address, index) => (
                                    <li key={index} className="address-item">
                                        <strong>{address.address}</strong>: {address.reason}
                                    </li>
                                ))}
                            </ul>
                            <button className="compris-button" onClick={handleCloseCard}>Compris</button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EtatCommunesPage;


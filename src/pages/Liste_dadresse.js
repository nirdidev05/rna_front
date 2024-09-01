import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressContext } from '../contexts/AdresseContext.js';
import '../styles/Liste_dadresse.css';
import SearchBar from '../components/SearchBar.jsx';
import FilterDropdown from '../components/FilterDropdown.jsx';
import Layout from '../components/Layout';

const ListeDAdressesPage = () => {
    const { refusedAddressesData } = useContext(AddressContext);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const navigate = useNavigate();

    if (!refusedAddressesData) return <div>Loading...</div>;

    // Filter addresses based on search term
    const filteredAddresses = refusedAddressesData.filter(address =>
        address.numeroAdresse && address.numeroAdresse.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort addresses based on filter type
    const sortedAddresses = [...filteredAddresses].sort((a, b) => {
        if (filterType === 'dateDernierAjout') {
            // Ensure the `dateDernierAjout` is defined and valid
            const dateA = new Date(a.dateDernierAjout);
            const dateB = new Date(b.dateDernierAjout);
            return dateB - dateA; // Sort from most recent to oldest
        }
        return 0; // No sorting
    });

    const handleConsultClick = (address) => {
        setSelectedAddress(address);
    };

    const handleCloseCard = () => {
        setSelectedAddress(null);
    };

    const handleFilterChange = (filterType) => {
        setFilterType(filterType);
    };

    return (
        <Layout>
            <div className="liste-d-adresses-page">
                <div className="top-container">
                    <SearchBar 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                   
                </div>
                <div className="top-container2">
                <FilterDropdown onFilterChange={handleFilterChange} />
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Numero Adresse</th>
                                <th>Wilaya</th>
                                <th>Commune</th>
                                <th>Ajouter en</th>
                                <th>Consulter</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAddresses.map((address, index) => (
                                <tr key={index}>
                                    <td>{address.numeroAdresse || 'N/A'}</td>
                                    <td>{address.wilaya || 'N/A'}</td>
                                    <td>{address.commune || 'N/A'}</td>
                                    <td>{address.ajouterEn || 'N/A'}</td>
                                    <td>
                                        <button onClick={() => handleConsultClick(address)}>Consulter</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="button-container">
                    <button className="add-address-btn" onClick={() => navigate('/formulaire')}>
                        Ajouter une adresse
                    </button>
                </div>
                {selectedAddress && (
                    <div className="address-card">
                        <div className="card-content">
                            {selectedAddress.image && (
                                <div className="card-image">
                                    <img src={selectedAddress.image} alt="Uploaded" />
                                </div>
                            )}
                            <h2>Détails de l'adresse</h2>
                            <p><strong>Wilaya:</strong> {selectedAddress.wilaya || 'N/A'}</p>
                            <p><strong>Daira:</strong> {selectedAddress.daira || 'N/A'}</p>
                            <p><strong>Commune:</strong> {selectedAddress.commune || 'N/A'}</p>
                            <p><strong>Numéro Adresse:</strong> {selectedAddress.numeroAdresse || 'N/A'}</p>
                            <p><strong>Adresse:</strong> {selectedAddress.adresse || 'N/A'}</p>
                            <p><strong>Prefixe:</strong> {selectedAddress.prefixe || 'N/A'}</p>
                            <p><strong>Code de la Voie:</strong> {selectedAddress.codeVoie || 'N/A'}</p>
                            <p><strong>Adresse Complète:</strong> {selectedAddress.adresseComplete || 'N/A'}</p>
                            <p><strong>Ancienne Appellation:</strong> {selectedAddress.ancienneAppellation || 'N/A'}</p>
                            <p><strong>Code Postal:</strong> {selectedAddress.codePostal || 'N/A'}</p>
                            <p><strong>Code ONS:</strong> {selectedAddress.codeOns || 'N/A'}</p>
                            <p><strong>Occupation:</strong> {selectedAddress.occupation || 'N/A'}</p>
                            <p><strong>Type Adresse:</strong> {selectedAddress.typeAdresse || 'N/A'}</p>
                            <p><strong>Ajouter en:</strong> {selectedAddress.ajouterEn || 'N/A'}</p>
                            <button className="close-card-btn" onClick={handleCloseCard}>
                                Fermer
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ListeDAdressesPage;




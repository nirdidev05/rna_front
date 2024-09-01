import React from 'react';
import '../styles/SearchBar2.css';

const EtatCommuneSearchBar = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    return (
        <div className="search-bar">
            <select value={filterType} onChange={handleFilterChange} className="filter-select">
                <option value="numero">Numéro Adresse</option>
                <option value="commune">Commune</option>
            </select>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={`Rechercher par ${filterType === 'numero' ? 'numéro adresse' : 'commune'}`}
            />
        </div>
    );
};

export default EtatCommuneSearchBar;

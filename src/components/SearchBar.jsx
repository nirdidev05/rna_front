import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleInputChange} 
                placeholder="Rechercher par numéro adresse" 
            />
        </div>
    );
};

export default SearchBar;





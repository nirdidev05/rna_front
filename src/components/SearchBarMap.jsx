import React, { useState } from 'react';
import '../styles/SearchBarMap.css';
import axios from 'axios'; // Assuming you use axios for API calls

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (query) {
            try {
                // Example with OpenStreetMap Nominatim
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                    },
                });
                
                const result = response.data[0];
                
                if (result && result.lat && result.lon) {
                    const coords = [parseFloat(result.lat), parseFloat(result.lon)];
                    onSearch(coords);
                } else {
                    console.error('No results found');
                }
            } catch (error) {
                console.error('Geocoding error:', error);
            }
        }
    };

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Trigger search on Enter key press
                placeholder="Enter an address or place"
            />
            <button onClick={handleSearch}>Search</button> {/* Search Button */}
        </div>
    );
};

export default SearchBar;

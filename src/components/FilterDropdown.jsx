// src/components/FilterDropdown.js
import React, { useState } from 'react';
import '../styles/FilterDropdown.css'; // Import the CSS for styling

const FilterDropdown = () => {
    const [selectedOption, setSelectedOption] = useState('date du dernier ajout');
    const options = [
        'date du dernier ajout',
        'commune',
        'wilaya'
    ];

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="filter-dropdown">
            <label htmlFor="filter">Filter par:</label>
            <select id="filter" value={selectedOption} onChange={handleChange}>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
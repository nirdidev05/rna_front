import React, { useContext } from 'react';
import { StatsContext } from '../contexts/StatsContext';

const CommuneDropdown = () => {
    const { communes, selectCommune } = useContext(StatsContext);

    const handleSelection = (event) => {
        selectCommune(event.target.value);
    };

    return (
        <div className="dropdown-container">
            <label htmlFor="commune-dropdown">Choisissez une commune:</label>
            <select id="commune-dropdown" onChange={handleSelection}>
                <option value="">Sélectionnez une commune</option>
                {communes.map((commune, index) => (
                    <option key={index} value={commune.name}>
                        {commune.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CommuneDropdown;

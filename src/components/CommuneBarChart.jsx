import React, { useContext, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatsContext } from '../contexts/StatsContext';

const CommuneBarChart = () => {
    const { communes, selectedCommune, selectCommune } = useContext(StatsContext);
    const [dropdownValue, setDropdownValue] = useState('Tous');

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setDropdownValue(selectedValue);
        selectCommune(selectedValue === 'Tous' ? null : selectedValue);
    };

    // Determine the data to display based on the selected commune
    const chartData = selectedCommune 
        ? [{ name: selectedCommune.name, invalid: selectedCommune.invalidCount, valid: selectedCommune.validCount }]
        : communes.map(commune => ({
            name: commune.name,
            invalid: commune.invalidCount,
            valid: commune.validCount,
        }));

    if (!chartData || chartData.length === 0) {
        return <div>No data available</div>;
    }

    // Adjust chart dimensions based on whether a specific commune is selected
    const chartWidth = selectedCommune ? 800 : chartData.length * 150;
    const chartHeight = selectedCommune ? 500 : 300;

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="commune-select">Sélectionnez une commune: </label>
                <select 
                    id="commune-select" 
                    value={dropdownValue} 
                    onChange={handleDropdownChange}
                >
                    <option value="Tous">Tous</option>
                    {communes.map((commune, index) => (
                        <option key={index} value={commune.name}>
                            {commune.name}
                        </option>
                    ))}
                </select>
            </div>
            
            <BarChart
                width={chartWidth} // Adjusted width based on selected commune
                height={chartHeight} // Adjusted height based on selected commune
                data={chartData}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="invalid" fill="red" />
                <Bar dataKey="valid" fill="green" />
            </BarChart>
        </div>
    );
};

export default CommuneBarChart;

// src/components/AddressBarChart.js

import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NumberAddressesContext } from '../contexts/NumberAddressesContext';

const AddressBarChart = () => {
    const { selectedYear, selectedCommune, selectYear, selectCommune, getMonthlyData, getCommuneList } = useContext(NumberAddressesContext);

    const handleYearChange = (event) => {
        selectYear(event.target.value);
    };

    const handleCommuneChange = (event) => {
        selectCommune(event.target.value);
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = getMonthlyData().map((value, index) => ({
        month: months[index],
        addresses: value,
    }));

    return (
        <div>
            <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
                <div>
                    <label htmlFor="year-select">Sélectionnez une année: </label>
                    <select id="year-select" value={selectedYear} onChange={handleYearChange} style={{ marginLeft: '10px' }}>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        {/* Add more years as needed */}
                    </select>
                </div>
                <div style={{ marginLeft: '40px' }}>
                    <label htmlFor="commune-select">Sélectionnez une commune: </label>
                    <select id="commune-select" value={selectedCommune} onChange={handleCommuneChange} style={{ marginLeft: '10px' }}>
                        {getCommuneList().map((commune, index) => (
                            <option key={index} value={commune}>
                                {commune}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={monthlyData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="addresses" fill="#82ca9d" name="Addresses Saved" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AddressBarChart;

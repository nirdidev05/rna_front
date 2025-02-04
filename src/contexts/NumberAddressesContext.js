// src/contexts/NumberAddressesContext.js

import React, { createContext, useState } from 'react';

export const NumberAddressesContext = createContext();

const initialData = {
    '2023': {
        'Alger': [5, 12, 18, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        'Oran': [3, 10, 15, 20, 25, 28, 32, 35, 37, 40, 45, 48],
        'Annaba': [2, 8, 14, 19, 24, 29, 34, 38, 42, 46, 50, 53],
        'Oued Smar': [4, 9, 13, 18, 23, 27, 31, 36, 39, 43, 47, 49],
        'El Harrach': [6, 11, 17, 21, 26, 31, 36, 41, 44, 48, 52, 56],
        'Batna': [3, 7, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
    },
    '2024': {
        'Alger': [7, 14, 19, 22, 28, 33, 38, 41, 47, 52, 58, 65],
        'Oran': [4, 11, 16, 22, 27, 30, 35, 39, 43, 47, 50, 55],
        'Annaba': [3, 9, 15, 20, 25, 30, 35, 39, 43, 47, 51, 54],
        'Oued Smar': [5, 10, 14, 19, 24, 28, 32, 37, 40, 44, 48, 50],
        'El Harrach': [7, 12, 18, 23, 28, 33, 38, 43, 46, 50, 54, 58],
        'Batna': [4, 8, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49],
    }
};

export const NumberAddressesProvider = ({ children }) => {
    const [addressesData, setAddressesData] = useState(initialData);
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedCommune, setSelectedCommune] = useState('Alger');

    const selectYear = (year) => {
        setSelectedYear(year);
    };

    const selectCommune = (commune) => {
        setSelectedCommune(commune);
    };

    const getMonthlyData = () => {
        if (addressesData[selectedYear] && addressesData[selectedYear][selectedCommune]) {
            return addressesData[selectedYear][selectedCommune];
        }
        return new Array(12).fill(0); // Default to 0 for each month if no data is found
    };

    // Optionally, provide a list of communes for dropdowns
    const getCommuneList = () => {
        return Object.keys(addressesData['2023']); // Assuming all years have the same communes
    };

    return (
        <NumberAddressesContext.Provider value={{ selectedYear, selectedCommune, selectYear, selectCommune, getMonthlyData, getCommuneList }}>
            {children}
        </NumberAddressesContext.Provider>
    );
};

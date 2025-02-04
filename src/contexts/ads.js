import React, { createContext, useState } from 'react';

// Data for each commune with monthly saved address counts for different years
const initialCommuneData = {
    'Alger': {
        '2023': [10, 12, 15, 18, 22, 20, 25, 28, 30, 24, 26, 31],
        '2024': [14, 16, 13, 19, 23, 21, 26, 29, 32, 25, 27, 33],
    },
    'Oran': {
        '2023': [8, 9, 11, 13, 16, 15, 17, 18, 20, 15, 18, 22],
        '2024': [10, 11, 13, 16, 18, 17, 19, 21, 23, 19, 20, 25],
    },
    // Add remaining data for other communes
};

export const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
    const [selectedCommune, setSelectedCommune] = useState(null);
    const [selectedYear, setSelectedYear] = useState('2023');

    const getCommuneStatsByYear = (commune, year) => {
        return initialCommuneData[commune] ? initialCommuneData[commune][year] : [];
    };

    return (
        <AdsContext.Provider value={{
            selectedCommune,
            setSelectedCommune,
            selectedYear,
            setSelectedYear,
            getCommuneStatsByYear
        }}>
            {children}
        </AdsContext.Provider>
    );
};

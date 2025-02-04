import React, { createContext, useState } from 'react';

export const StatsContext = createContext();

const initialCommunes = [
    { name: 'Alger', studyCount: 10, invalidCount: 5, validCount: 15 },
    { name: 'Oran', studyCount: 12, invalidCount: 4, validCount: 18 },
    { name: 'Constantine', studyCount: 8, invalidCount: 6, validCount: 14 },
    { name: 'Annaba', studyCount: 9, invalidCount: 3, validCount: 16 },
    { name: 'Tlemcen', studyCount: 11, invalidCount: 7, validCount: 13 },
    { name: 'Blida', studyCount: 10, invalidCount: 5, validCount: 20 },
    { name: 'Setif', studyCount: 14, invalidCount: 2, validCount: 17 },
    { name: 'Bordj Bou Arreridj', studyCount: 7, invalidCount: 8, validCount: 11 },
    { name: 'Tizi Ouzou', studyCount: 13, invalidCount: 6, validCount: 15 },
    { name: 'El Oued', studyCount: 6, invalidCount: 4, validCount: 12 }
];

export const StatsProvider = ({ children }) => {
    const [communes, setCommunes] = useState(initialCommunes);
    const [selectedCommune, setSelectedCommune] = useState(null);

    const getAggregatedStats = () => {
        return communes.reduce((acc, commune) => {
            acc.studyCount += commune.studyCount;
            acc.invalidCount += commune.invalidCount;
            acc.validCount += commune.validCount;
            return acc;
        }, { studyCount: 0, invalidCount: 0, validCount: 0 });
    };

    const selectCommune = (communeName) => {
        const commune = communes.find(c => c.name === communeName);
        setSelectedCommune(commune || null);
    };

    return (
        <StatsContext.Provider value={{ communes, selectedCommune, selectCommune, getAggregatedStats }}>
            {children}
        </StatsContext.Provider>
    );
};

import React, { createContext, useState } from 'react';

// Initial data
const refusedAddressesData = [
    { numero: '00AZE1', commune: 'Barika', refuse: true, valide: false, refusees: [{ numero: '001', reason: 'Incorrect format' }] },
    { numero: 'EEDD3', commune: 'El marsa', refuse: true, valide: false, refusees: [{ numero: '002', reason: 'Incomplete address' }] },
    { numero: '0CD390', commune: 'Annaba', refuse: false, valide: true, refusees: [] },
    { numero: '1293B', commune: 'El Ayoune', refuse: true, valide: false, refusees: [{ numero: '004', reason: 'Not found' }] },
    { numero: 'HGCV34', commune: 'Bouzina', refuse: false, valide: true, refusees: [] },
];

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [refusedAddressesDataState, setRefusedAddressesDataState] = useState(refusedAddressesData);

    return (
        <AddressContext.Provider value={{ refusedAddressesData: refusedAddressesDataState }}>
            {children}
        </AddressContext.Provider>
    );
};

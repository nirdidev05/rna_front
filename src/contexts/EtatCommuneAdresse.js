import React, { createContext, useState } from 'react';

// Initial data
const refusedAddressesData = [
    { numero: '001', commune: 'Commune A', refuse: true, valide: false, refusees: [{ numero: '001', reason: 'Incorrect format' }] },
    { numero: '002', commune: 'Commune A', refuse: true, valide: false, refusees: [{ numero: '002', reason: 'Incomplete address' }] },
    { numero: '003', commune: 'Commune C', refuse: false, valide: true, refusees: [] },
    { numero: '004', commune: 'Commune D', refuse: true, valide: false, refusees: [{ numero: '004', reason: 'Not found' }] },
    { numero: '005', commune: 'Commune E', refuse: false, valide: true, refusees: [] },
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

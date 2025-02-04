import React, { createContext, useState } from 'react';

// Initial data
const initialAddressData = [
    { numero: '001', commune: 'Commune A', enregistree: true, refuse: false, valide: true },
    { numero: '002', commune: 'Commune B', enregistree: true, refuse: true, valide: false },
    { numero: '003', commune: 'Commune C', enregistree: true, refuse: false, valide: true },
    { numero: '004', commune: 'Commune D', enregistree: true, refuse: true, valide: false },
    { numero: '005', commune: 'Commune E', enregistree: true, refuse: false, valide: true },
];

const refusedAddressesData = [
    { id: 1, wilaya: '1', commune: '1', enregistrees: 2, refusees: [{ address: 'Address 1', reason: 'Reason 1' }], valides: 1 },
    { id: 2, wilaya: '2', commune: '2', enregistrees: 4, refusees: [{ address: 'Address 2', reason: 'Reason 2' }, { address: 'Address 3', reason: 'Reason 3' }], valides: 2 },
    { id: 3, wilaya: '3', commune: '3', enregistrees: 6, refusees: [{ address: 'Address 4', reason: 'Reason 4' }, { address: 'Address 5', reason: 'Reason 5' }, { address: 'Address 6', reason: 'Reason 6' }], valides: 3 },
    { id: 4, wilaya: '4', commune: '4', enregistrees: 8, refusees: [{ address: 'Address 7', reason: 'Reason 7' }, { address: 'Address 8', reason: 'Reason 8' }, { address: 'Address 9', reason: 'Reason 9' }, { address: 'Address 10', reason: 'Reason 10' }], valides: 4 },
    { id: 5, wilaya: '5', commune: '5', enregistrees: 10, refusees: [{ address: 'Address 11', reason: 'Reason 11' }], valides: 5 },
];

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [addressData, setAddressData] = useState(initialAddressData);

    return (
        <AddressContext.Provider value={{ addressData, setAddressData, refusedAddressesData }}>
            {children}
        </AddressContext.Provider>
    );
};

import React from 'react';
import { useAddressData } from './AddressDataContext';

const YearSelector = () => {
  const { handleYearChange } = useAddressData();

  const handleChange = (event) => {
    handleYearChange(Number(event.target.value));
  };

  return (
    <select onChange={handleChange}>
      <option value={2023}>2023</option>
      <option value={2024}>2024</option>
    </select>
  );
};

export default YearSelector;

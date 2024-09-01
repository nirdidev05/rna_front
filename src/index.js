// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AddressProvider } from './contexts/AdresseContext';

ReactDOM.render(
  <AddressProvider>
    <App />
  </AddressProvider>,
  document.getElementById('root')
);

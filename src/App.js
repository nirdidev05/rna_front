import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MapPage from './pages/MAP';
import LesStatistiquesPage from './pages/les_statitstiques.js'; // Fixed typo in import path
import ListeAdressesPage from './pages/Liste_dadresse.js';
import EtatCommunesPage from './pages/Etat_Commune.js';
import FormulairePage from './pages/Formulaire.js';
import { AddressProvider } from './contexts/EtatCommuneAdresse.js'; // Import AddressProvider

function App() {
  return (
    <BrowserRouter>
      <AddressProvider> {/* Wrap your routes with AddressProvider */}
        <Routes>
          <Route path="/etat-communes" element={<EtatCommunesPage />} />
          <Route path="/les-statistiques" element={<LesStatistiquesPage />} />
          <Route path="/liste-adresses" element={<ListeAdressesPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/formulaire" element={<FormulairePage />} />
          <Route path="/" element={<MapPage />} /> {/* Default route */}
        </Routes>
      </AddressProvider>
    </BrowserRouter>
  );
}

export default App;


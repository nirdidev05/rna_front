import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddressContext } from '../contexts/AdresseContext.js';
import '../styles/Formulaire.css';

const FormulairePage = () => {
    const { refusedAddressesData, setRefusedAddressesData } = useContext(AddressContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { address, rowIndex } = location.state || {};

    const [formData, setFormData] = useState({
        wilaya: '',
        daira: '',
        commune: '',
        numeroAdresse: '',
        adresse: '',
        prefixe: '',
        codeVoie: '',
        adresseComplete: '',
        ancienneAppellation: '',
        codePostal: '',
        codeOns: '',
        occupation: '',
        typeAdresse: 'code rue',
        image: '' 
    });

    useEffect(() => {
        if (address) {
            setFormData(address);
        }
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result }); // Convert the image to a base64 string and store it
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new address object
        const newAddress = {
            ...formData,
            ajouterEn: new Date().toLocaleDateString() // Add the current date
        };

        // Update the context data
        let updatedData;
        if (rowIndex !== undefined && rowIndex < refusedAddressesData.length) {
            updatedData = [...refusedAddressesData];
            updatedData[rowIndex] = newAddress; // Update the existing address
        } else {
            updatedData = [...refusedAddressesData, newAddress]; // Add new address
        }

        setRefusedAddressesData(updatedData);

        // Navigate back to the previous page
        navigate(-1);
    };

    return (
        <div className="formulaire-page">
            <h1>Formulaire d'Adresse</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-row">
                    <label>
                        Wilaya:
                        <input type="text" name="wilaya" value={formData.wilaya} onChange={handleChange} />
                    </label>
                    <label>
                        Daira:
                        <input type="text" name="daira" value={formData.daira} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Commune:
                        <input type="text" name="commune" value={formData.commune} onChange={handleChange} />
                    </label>
                    <label>
                        Numéro Adresse:
                        <input type="text" name="numeroAdresse" value={formData.numeroAdresse} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Adresse:
                        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Prefixe:
                        <input type="text" name="prefixe" value={formData.prefixe} onChange={handleChange} />
                    </label>
                    <label>
                        Code de la Voie:
                        <input type="text" name="codeVoie" value={formData.codeVoie} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Adresse Complète:
                        <input type="text" name="adresseComplete" value={formData.adresseComplete} onChange={handleChange} />
                    </label>
                    <label>
                        Ancienne Appellation:
                        <input type="text" name="ancienneAppellation" value={formData.ancienneAppellation} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Code Postal:
                        <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} />
                    </label>
                    <label>
                        Code ONS:
                        <input type="text" name="codeOns" value={formData.codeOns} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Occupation:
                        <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
                    </label>
                    <label>
                        Type Adresse:
                        <select name="typeAdresse" value={formData.typeAdresse} onChange={handleChange}>
                            <option value="code rue">Code Rue</option>
                            <option value="code city">Code City</option>
                        </select>
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Prendre une photo:
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>
                <button type="submit" className="submit-button">
                    Enregistrer
                </button>
            </form>
        </div>
    );
};

export default FormulairePage;

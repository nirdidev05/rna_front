import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../styles/MAP.css';
import Header from '../components/header.jsx';
import Menu from '../components/Menu.jsx';
import SearchBar from '../components/SearchBarMap.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';
import 'leaflet-draw';

const MapPage = () => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
    const [drawingEnabled, setDrawingEnabled] = useState(false);
    const [drawType, setDrawType] = useState(null);
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [showNameDialog, setShowNameDialog] = useState(false);
    const [circleName, setCircleName] = useState('');
    const [drawnRectangle, setDrawnRectangle] = useState(null);
    const mapRef = useRef();

    const handlePrint = () => {
        window.print();
    };

    const handleCadrer = (type) => {
        setDrawType(type);
        setDrawingEnabled(true);
    };

    const handleSelectionner = () => {
    };

    const calculateRectangleArea = (bounds) => {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const lat1 = sw.lat;
        const lng1 = sw.lng;
        const lat2 = ne.lat;
        const lng2 = ne.lng;

        const R = 6371; // Radius of Earth in km
        const lat1Rad = lat1 * (Math.PI / 180);
        const lat2Rad = lat2 * (Math.PI / 180);
        const lng1Rad = lng1 * (Math.PI / 180);
        const lng2Rad = lng2 * (Math.PI / 180);
        const area = R * R * Math.abs(lng2Rad - lng1Rad) * Math.abs(lat2Rad - lat1Rad);

        return area.toFixed(2); // Area in square km
    };

    const handleConfirmPrint = () => {
        if (drawnRectangle) {
            const rectangleBounds = drawnRectangle.getBounds();
            const area = calculateRectangleArea(rectangleBounds);
            console.log(`Area of the rectangle: ${area} sq km`);
            window.print();
        }
        setShowPrintDialog(false);
    };

    const handleCancelPrint = () => {
        setShowPrintDialog(false);
    };

    const handleNameChange = (e) => {
        setCircleName(e.target.value);
    };

    const handleNameSubmit = () => {
        setShowNameDialog(false);
    };

    const setupDrawControl = () => {
        const map = mapRef.current;

        if (!map) return;

        // Remove all controls except zoom controls
        map.eachLayer(layer => {
            if (layer instanceof L.Control) {
                if (!(layer instanceof L.Control.Zoom)) {
                    map.removeControl(layer);
                }
            }
        });

        const featureGroup = new L.FeatureGroup().addTo(map);

        const drawControl = new L.Control.Draw({
            draw: {
                polygon: false,
                circle: drawType === 'circle',
                polyline: false,
                rectangle: drawType === 'rectangle',
                marker: false
            },
            edit: {
                featureGroup: featureGroup,
            }
        });

        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, (event) => {
            const layer = event.layer;

            if (drawType === 'rectangle') {
                featureGroup.clearLayers();
                featureGroup.addLayer(layer);
                setDrawnRectangle(layer);
                setDrawingEnabled(false);
                setShowPrintDialog(true);
            } else if (drawType === 'circle') {
                featureGroup.clearLayers();
                featureGroup.addLayer(layer);
                setDrawingEnabled(false);
                setShowNameDialog(true);
            }
        });
    };

    const CustomMap = () => {
        const map = useMap();
        mapRef.current = map;
        setupDrawControl();
        return null;
    };

    return (
        <div className="map-page">
            <Header />
            <div className="main-content">
                <Menu />
                <div className="map-container">
                    <div className="top-bar">
                        <span className="nav-item">MAP</span>
                        <SearchBar onSearch={setPosition} />
                        <span className="nav-item" onClick={handlePrint}>
                            <FontAwesomeIcon icon={faPrint} /> IMPRIMER
                        </span>
                        <span className="nav-item" onClick={() => handleCadrer('rectangle')}>
                            CADRER
                        </span>
                        <span className="nav-item" onClick={handleSelectionner}>
                            SELECTIONNER
                        </span>
                    </div>
                    <div className="map-content">
                        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>
                                    A sample marker at {position[0]}, {position[1]}.
                                </Popup>
                            </Marker>
                            <CustomMap />
                        </MapContainer>
                    </div>
                </div>
            </div>
            {showPrintDialog && (
                <div className="print-dialog">
                    <div className="dialog-content">
                        <h3>Would you like to print the content within the drawn rectangle?</h3>
                        <button onClick={handleConfirmPrint}>Print</button>
                        <button onClick={handleCancelPrint}>Cancel</button>
                    </div>
                </div>
            )}
            {showNameDialog && (
                <div className="name-dialog">
                    <div className="dialog-content">
                        <h3>Enter a name for the circle</h3>
                        <input type="text" value={circleName} onChange={handleNameChange} placeholder="Circle Name" />
                        <button onClick={handleNameSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapPage;

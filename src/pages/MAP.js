import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Rectangle, Circle, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MAP.css';
import Header from '../components/header.jsx';
import Menu from '../components/Menu.jsx';
import SearchBar from '../components/SearchBarMap.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';
import axios from 'axios';

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const defaultPosition = [51.505, -0.09]; // Default position (London)

const MapPage = () => {
    const [position, setPosition] = useState(defaultPosition);
    const [drawingEnabled, setDrawingEnabled] = useState(false);
    const [drawType, setDrawType] = useState(null);
    const [rectangleBounds, setRectangleBounds] = useState(null);
    const [circleCenter, setCircleCenter] = useState(null);
    const [circleRadius, setCircleRadius] = useState(null);
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [showNameDialog, setShowNameDialog] = useState(false);
    const [circleName, setCircleName] = useState('');
    const [markerPlacementEnabled, setMarkerPlacementEnabled] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [placeName, setPlaceName] = useState('');
    const [showOptionsDialog, setShowOptionsDialog] = useState(false); 

    const MapViewUpdater = ({ position }) => {
        const map = useMap();
        React.useEffect(() => {
            map.setView(position, map.getZoom());
        }, [position, map]);
        return null;
    };

    const MapClickHandler = () => {
        const [start, setStart] = useState(null);

        useMapEvents({
            click: (e) => {
                if (drawingEnabled && e.latlng) {
                    const { lat, lng } = e.latlng;

                    if (drawType === 'rectangle') {
                        if (!start) {
                            // First click sets the start corner
                            setStart(e.latlng);
                            setRectangleBounds(null); // Clear previous rectangle
                        } else {
                            // Second click sets the end corner and completes the rectangle
                            const end = e.latlng;
                            const bounds = [
                                [Math.min(start.lat, end.lat), Math.min(start.lng, end.lng)],
                                [Math.max(start.lat, end.lat), Math.max(start.lng, end.lng)]
                            ];
                            setRectangleBounds(bounds);
                            setDrawingEnabled(false);
                            setStart(null);
                            setShowOptionsDialog(true); // Show options dialog after drawing the rectangle
                        }
                    } else if (drawType === 'circle') {
                        setCircleCenter(e.latlng);
                        setCircleRadius(1000); // Example radius in meters
                        setDrawingEnabled(false);
                        setShowNameDialog(true);
                    }
                } else if (markerPlacementEnabled && e.latlng) {
                    setMarkerPosition(e.latlng);
                    fetchPlaceName(e.latlng.lat, e.latlng.lng);
                    setMarkerPlacementEnabled(false); // Disable marker placement mode after placing the marker
                }
            },
        });

        return null;
    };

    const fetchPlaceName = async (lat, lng) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                params: {
                    lat: lat,
                    lon: lng,
                    format: 'json'
                }
            });
            if (response.data && response.data.display_name) {
                setPlaceName(response.data.display_name);
            } else {
                setPlaceName('No place name found');
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
            setPlaceName('Error fetching place name');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleCadrer = (type) => {
        setDrawType(type);
        setDrawingEnabled(true);
        setMarkerPlacementEnabled(false); // Ensure marker placement is disabled when starting drawing
    };

    const handleSelectionner = () => {
        setDrawingEnabled(false); // Ensure drawing is disabled
        setMarkerPlacementEnabled(true); // Enable marker placement
    };

    const calculateRectangleArea = (bounds) => {
        if (!bounds || !bounds[0] || !bounds[1]) return 0;

        const [[lat1, lng1], [lat2, lng2]] = bounds;
        const R = 6371; // Radius of Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const lat1Rad = lat1 * (Math.PI / 180);
        const lat2Rad = lat2 * (Math.PI / 180);

        // Calculate area using the formula for a spherical rectangle
        const area = R * R * Math.abs(dLat) * Math.abs(dLng) * Math.cos((lat1Rad + lat2Rad) / 2);

        return area.toFixed(2); // Area in square km
    };

    const handleConfirmPrint = () => {
        if (rectangleBounds) {
            const area = calculateRectangleArea(rectangleBounds);
            console.log(`Area of the rectangle: ${area} sq km`);
            window.print();
        }
        setShowOptionsDialog(false); // Close options dialog
    };

    const handleCancelPrint = () => {
        setShowOptionsDialog(false); // Close options dialog
    };

    const handleRedraw = () => {
        setRectangleBounds(null); // Clear the current rectangle
        setShowOptionsDialog(false); // Close options dialog
        handleCadrer('rectangle'); // Re-enable drawing mode
    };

    const handleNameChange = (e) => {
        setCircleName(e.target.value);
    };

    const handleNameSubmit = () => {
        setShowNameDialog(false);
    };

    return (
        <div className="map-page">
            <Header />
            <div className="main-content">
                <Menu />
                <div className="map-container">
                    <div className="top-bar">
                        <span className="nav-item">MAP</span>
                        <SearchBar onSearch={(coords) => {
                            console.log('Search results:', coords); // Log search results
                            if (Array.isArray(coords) && coords.length === 2) {
                                const [lat, lng] = coords;
                                if (!isNaN(lat) && !isNaN(lng)) {
                                    setPosition([lat, lng]);
                                } else {
                                    console.error('Invalid coordinates received');
                                }
                            } else {
                                console.error('Invalid coordinates format');
                            }
                        }} />
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
                        <MapContainer center={position} zoom={13} style={mapContainerStyle}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                            />
                            <MapViewUpdater position={position} />
                            {position && !isNaN(position[0]) && !isNaN(position[1]) && (
                                <Marker position={position}>
                                    <Tooltip>Coordinates: {position.join(', ')}</Tooltip>
                                </Marker>
                            )}
                            {rectangleBounds && (
                                <Rectangle bounds={rectangleBounds} />
                            )}
                            {circleCenter && circleRadius && (
                                <Circle center={circleCenter} radius={circleRadius} />
                            )}
                            {markerPosition && (
                                <Marker position={markerPosition}>
                                    <Tooltip>Coordinates: {markerPosition.lat.toFixed(5)}, {markerPosition.lng.toFixed(5)}<br />Place: {placeName}</Tooltip>
                                </Marker>
                            )}
                            <MapClickHandler />
                        </MapContainer>
                    </div>
                </div>
            </div>
            {showOptionsDialog && (
                <div className="options-dialog">
                    <div className="dialog-content">
                        <h3>What would you like to do with the rectangle?</h3>
                        <p>Area: {rectangleBounds ? calculateRectangleArea(rectangleBounds) : '0'} sq km</p>
                        <button onClick={handleConfirmPrint}>Print</button>
                        <button onClick={handleRedraw}>Redraw</button>
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

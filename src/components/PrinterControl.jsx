import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { renderToString } from 'react-dom/server';

const PrinterControl = () => {
    const map = useMap();

    useEffect(() => {
        const printControl = L.control({ position: 'topleft' });

        printControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

            // Using React to render the FontAwesomeIcon inside the div
            div.innerHTML = `<div class="printer-icon">${renderToString(<FontAwesomeIcon icon={faPrint} />)}</div>`;

            div.onclick = () => {
                window.print(); // Trigger the print dialog
            };

            return div;
        };

        printControl.addTo(map);

        return () => {
            map.removeControl(printControl);
        };
    }, [map]);

    return null;
};

export default PrinterControl;

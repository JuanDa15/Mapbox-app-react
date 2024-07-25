import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MapProvider, PlacesProvider, RouteProvider } from './context';

import mapboxgl from 'mapbox-gl';

console.log(import.meta.env.VITE_MAPBOX_KEY);
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY as string;

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapProvider>
      <PlacesProvider>
        <RouteProvider>
          <App />
        </RouteProvider>
      </PlacesProvider>
    </MapProvider>
  </React.StrictMode>
);

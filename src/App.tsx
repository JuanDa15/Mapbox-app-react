import { useEffect } from 'react';
import { MapProvider, PlacesProvider, RouteProvider } from './context';
import { HomePage } from './pages';

function App() {
  useEffect(() => {
    const initializeMapBox = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapboxgl = (await import('mapbox-gl')) as any;
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY as string;
    };

    initializeMapBox();
  }, []);

  return (
    <MapProvider>
      <RouteProvider>
        <PlacesProvider>
          <HomePage />
        </PlacesProvider>
      </RouteProvider>
    </MapProvider>
  );
}

export default App;

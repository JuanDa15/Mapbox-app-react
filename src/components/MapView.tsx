import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext } from '../context';
import { Loader } from './Loader';

export const MapView = (): JSX.Element => {
  const { userLocation } = useContext(MapContext);
  const { setMap } = useContext(MapContext);

  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = async () => {
      const mapboxgl = await import('mapbox-gl');

      const map = new mapboxgl.Map({
        container: mapRef.current! as HTMLElement, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 16, // starting zoom
      });
      setMap(map);
    };

    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  if (!userLocation) {
    return <Loader />;
  }
  return <div ref={mapRef} className='h-screen w-screen'></div>;
};

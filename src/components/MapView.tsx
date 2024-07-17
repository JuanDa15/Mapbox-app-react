import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext, PlacesContext } from '../context';
import { Loader } from './Loader';
import mapboxgl from 'mapbox-gl';

export const MapView = (): JSX.Element => {
  const { location, isLoading } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapRef.current! as HTMLElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: location, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    setMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }
  return <div ref={mapRef} className='h-screen w-screen'></div>;
};

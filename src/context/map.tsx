import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { mapReducer } from '../reducers';
import { Map } from 'mapbox-gl';
import { IMapContextProps, MapState } from '../interfaces';
import { createUserMarker, getLocation } from '../helpers';

const MAP_INITIAL_STATE: MapState = {
  map: undefined,
  isMapReady: false,
  userLocation: undefined,
};

export const MapContext = createContext<IMapContextProps>(
  {} as IMapContextProps
);

export function MapProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(mapReducer, MAP_INITIAL_STATE);

  useEffect(() => {
    const initializeLocation = async () => {
      const resp = await getLocation().catch(console.log);
      dispatch({
        type: 'SET_LOCATION',
        payload: resp,
      });
    };

    initializeLocation();
  }, []);

  const navigateToPlace = ([lng, lat]: [number, number]) => {
    state.map!.flyTo({
      zoom: 14,
      center: [lng, lat],
      animate: true,
    });
  };

  const setMap = (map: Map) => {
    createUserMarker(map.getCenter()).addTo(map);
    dispatch({
      type: 'SET_MAP',
      payload: map,
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        navigateToPlace,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

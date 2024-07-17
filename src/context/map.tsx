import { createContext, PropsWithChildren, useReducer } from 'react';
import { mapReducer } from '../reducers';
import { Map } from 'mapbox-gl';
import { IMapContextProps, MapState } from '../interfaces';

const MAP_INITIAL_STATE: MapState = {
  map: undefined,
  isMapReady: false,
};

export const MapContext = createContext<IMapContextProps>(
  {} as IMapContextProps
);

export function MapProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(mapReducer, MAP_INITIAL_STATE);

  const setMap = (map: Map) => {
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

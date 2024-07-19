import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { mapReducer } from '../reducers';
import { Map, Marker, Popup } from 'mapbox-gl';
import { IMapContextProps, MapState } from '../interfaces';
import { PlacesContext } from './places';
import { createMarker, createMarkerWithCoords } from '../helpers';
import directionsApi from '../API/directions';

const MAP_INITIAL_STATE: MapState = {
  map: undefined,
  isMapReady: false,
  markers: [],
  directions: [],
  directionsMarkers: [],
};

export const MapContext = createContext<IMapContextProps>(
  {} as IMapContextProps
);

export function MapProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(mapReducer, MAP_INITIAL_STATE);
  const { searchedPlaces } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    setMarkers([]);

    const newMarkers: Marker[] = [];
    for (const place of searchedPlaces) {
      const marker = createMarker(place).addTo(state.map!);
      newMarkers.push(marker);
    }

    dispatch({
      type: 'SET_MARKERS',
      payload: newMarkers,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedPlaces]);

  useEffect(() => {
    state.directionsMarkers.forEach((marker) => marker.remove());
    dispatch({ type: 'SET_DIRECTIONS_MARKERS', payload: [] });

    const newMarkerDirections = [];
    for (const direction of state.directions) {
      const marker = createMarkerWithCoords(direction).addTo(state.map!);
      newMarkerDirections.push(marker);
    }
    dispatch({ type: 'SET_DIRECTIONS_MARKERS', payload: newMarkerDirections });

    if (state.directions.length < 2) return;

    createRoute(state.directions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.directions]);

  const navigateToPlace = ([lng, lat]: [number, number]) => {
    state.map!.flyTo({
      zoom: 14,
      center: [lng, lat],
      animate: true,
    });
  };

  const setMap = (map: Map) => {
    const popup = new Popup().setHTML(`
      <h4 class="text-black">You are here</h4>  
    `);
    new Marker({
      color: '#61dadb',
    })
      .setLngLat(map.getCenter())
      .setPopup(popup)
      .addTo(map);

    dispatch({
      type: 'SET_MAP',
      payload: map,
    });
  };

  const setMarkers = (markers: Marker[]) => {
    dispatch({
      type: 'SET_MARKERS',
      payload: markers,
    });
  };

  const addDirection = (coords: [number, number]) => {
    dispatch({
      type: 'SET_DIRECTION',
      payload: coords,
    });
  };

  const createRoute = async (coords: [number, number][]) => {
    const coordsString = coords.join(';');

    const { data } = await directionsApi.get(coordsString);
    console.log(data);
    console.log(coords);
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        setMarkers,
        navigateToPlace,
        createRoute,
        addDirection,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

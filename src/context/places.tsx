import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { placesReducer } from '../reducers';
import { createMarker, getLocation, updateMapRoute } from '../helpers';
import {
  DirectionsResponse,
  getPlacesByQueryArgs,
  IPlacesContextProps,
  IPlacesState,
} from '../interfaces';
import forwardSearchApi from '../API/forward-geolocation';
import { ForwardGeolocationResponse } from '../interfaces';
import directionsApi from '../API/directions';
import { Marker } from 'mapbox-gl';
import { MapContext } from './map';

const INITIAL_STATE: IPlacesState = {
  isLoading: true,
  location: undefined,
  searchedPlaces: [],
  isLoadingData: false,
  searchMode: false,
  markers: [],
};

export const PlacesContext = createContext<IPlacesContextProps>(
  {} as IPlacesContextProps
);

export const PlacesProvider = ({ children }: PropsWithChildren) => {
  const { map } = useContext(MapContext);
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

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

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    setMarkers([]);

    const newMarkers: Marker[] = [];
    for (const place of state.searchedPlaces) {
      const marker = createMarker(place).addTo(map!);
      newMarkers.push(marker);
    }
    setMarkers(newMarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchedPlaces]);

  const getPlacesByQuery = async ({ q, limit = '5' }: getPlacesByQueryArgs) => {
    if (q.length === 0) {
      dispatch({ type: 'SET_SEARCHED_PLACES', payload: [] });
      return;
    }

    dispatch({ type: 'SET_LOADING' });
    const {
      data: { features },
    } = await forwardSearchApi.get<ForwardGeolocationResponse>('', {
      params: {
        q,
        limit,
        proximity: state.location?.join(','),
      },
    });

    dispatch({ type: 'SET_SEARCHED_PLACES', payload: features });
  };

  const turnOffSearchMode = () => {
    dispatch({ type: 'TURN_OFF_SEARCH_MODE' });
  };

  const getRouteLocation = async (coords: [number, number]) => {
    if (!state.location) return;

    const coordsString = [state.location, coords].join(';');
    console.log(coordsString);
    const { data } = await directionsApi.get<DirectionsResponse>(coordsString);

    // TODO: Mostrar una alerta bonita
    if (data.routes.length === 0) return alert('Route not found');

    updateMapRoute({
      addresses: [coords],
      map: map!,
      route: data.routes[0],
      userLocation: state.location,
      drawMarkers: false,
    });
  };

  const setMarkers = (markers: Marker[]) => {
    dispatch({
      type: 'SET_MARKERS',
      payload: markers,
    });
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        getPlacesByQuery,
        turnOffSearchMode,
        getRouteLocation,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

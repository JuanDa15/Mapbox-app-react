import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { placesReducer } from '../reducers';
import { createMarker, updateMapRoute } from '../helpers';
import {
  getPlacesByQueryArgs,
  IPlacesContextProps,
  IPlacesState,
} from '../interfaces';
import forwardSearchApi from '../API/forward-geolocation';
import { ForwardGeolocationResponse } from '../interfaces';
import { Marker } from 'mapbox-gl';
import { MapContext } from './map';
import { getRoutes } from '../services';

const INITIAL_STATE: IPlacesState = {
  searchedPlaces: [],
  isLoadingData: false,
  searchMode: false,
  markers: [],
  route: {
    coords: [0, 0],
    selectedRoute: null,
  },
};

export const PlacesContext = createContext<IPlacesContextProps>(
  {} as IPlacesContextProps
);

export const PlacesProvider = ({ children }: PropsWithChildren) => {
  const { map, userLocation } = useContext(MapContext);
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

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

  useEffect(() => {
    if (!state.route.selectedRoute) return;
    if (!state.searchMode) return;

    updateMapRoute({
      addresses: [state.route.coords!],
      map: map!,
      route: state.route.selectedRoute!,
      userLocation: userLocation!,
      drawMarkers: false,
      layerName: 'SearchRouteString',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.route.selectedRoute]);

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
        proximity: userLocation?.join(','),
      },
    });

    dispatch({ type: 'SET_SEARCHED_PLACES', payload: features });
  };

  const turnOffSearchMode = () => {
    state.markers.forEach((marker) => marker.remove());
    setMarkers([]);
    map?.removeLayer('SearchRouteString');
    map?.removeSource('SearchRouteString');
    dispatch({ type: 'TURN_OFF_SEARCH_MODE' });
  };

  const getRouteLocation = async (coords: [number, number]) => {
    if (!userLocation) return;

    const coordsString = [userLocation, coords].join(';');
    const routes = await getRoutes(coordsString);

    dispatch({
      type: 'SET_ROUTE',
      payload: {
        selectedRoute: routes[0],
        coords: coords,
      },
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

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  DirectionsResponse,
  IRouteContextProps,
  Route,
  RouteState,
} from '../interfaces';
import { PlacesContext } from './places';
import { routeReducer } from '../reducers';
import { MapContext } from './map';
import directionsApi from '../API/directions';
import { updateMapRoute } from '../helpers';
import { Marker } from 'mapbox-gl';

const ROUTE_INITIAL_STATE: RouteState = {
  routes: undefined,
  directions: [],
  routeMode: false,
  directionsMarkers: [],
  activeRoute: null,
};

export const RouteContext = createContext<IRouteContextProps>(
  {} as IRouteContextProps
);

export function RouteProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(routeReducer, ROUTE_INITIAL_STATE);
  const { location } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (state.directions.length < 1) return;

    createRoute(state.directions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.directions]);

  useEffect(() => {
    if (state.activeRoute === null) return;

    clearMarkers();
    updateMapRoute({
      addresses: state.directions,
      map: map!,
      userLocation: location!,
      route: state.activeRoute!,
      updateDirectionsMarker: (value: Marker[]) =>
        dispatch({ type: 'SET_DIRECTION_MARKERS', payload: value }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeRoute]);

  const createRoute = async (coords: [number, number][]) => {
    if (!location) return;

    const coordsString = [location, ...coords].join(';');

    const { data } = await directionsApi.get<DirectionsResponse>(coordsString);

    dispatch({ type: 'SET_ROUTE_DATA', payload: data });
    selectActiveRoute(data.routes[0]);
  };

  const selectActiveRoute = (route: Route) => {
    dispatch({ type: 'SET_ACTIVE_ROUTE', payload: route });
  };

  const clearMarkers = () => {
    state.directionsMarkers.forEach((marker) => marker.remove());
    dispatch({ type: 'SET_DIRECTION_MARKERS', payload: [] });
  };

  const addDirection = (coords: [number, number]) => {
    dispatch({
      type: 'SET_DIRECTION',
      payload: coords,
    });
  };

  const turnOffRouteMode = () => {
    clearMarkers();
    map?.removeLayer('RouteString');
    map?.removeSource('RouteString');
    dispatch({ type: 'CLEAR_DIRECTIONS' });
    dispatch({ type: 'SET_ACTIVE_ROUTE', payload: null });
  };

  return (
    <RouteContext.Provider
      value={{
        ...state,
        createRoute,
        addDirection,
        turnOffRouteMode,
        selectActiveRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

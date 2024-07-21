import { Marker } from "mapbox-gl";
import { ROUTE_ACTIONS } from "../reducers";
import { DirectionsResponse, Route } from "./directions-response";

export interface RouteState {
  routes: undefined | DirectionsResponse,
  directions: [number, number][],
  routeMode: boolean,
  directionsMarkers: Marker[],
  activeRoute: Route | null
}

export interface IRouteContextProps extends RouteState {
  createRoute: (coords: [number, number][]) => Promise<void>;
  addDirection: (coords: [number, number]) => void;
  turnOffRouteMode: () => void;
  selectActiveRoute: (route: Route) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RouteAction<T = any> extends Action<T> {
  type: keyof typeof ROUTE_ACTIONS;
}
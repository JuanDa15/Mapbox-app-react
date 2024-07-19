/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map, Marker } from "mapbox-gl";
import { MAP_ACTIONS } from "../reducers";

export interface MapState {
  map?: Map,
  isMapReady: boolean,
  markers: Marker[],
  directions: [number, number][],
  directionsMarkers: Marker[]
}
export interface IMapContextProps extends MapState {
  setMap: (map: Map) => void;
  setMarkers: (markers: Marker[]) => void;
  navigateToPlace: (coords: [number, number]) => void;
  createRoute: (coords: [number, number][]) => Promise<void>;
  addDirection: (coords: [number, number]) => void;
}
export interface MapAction<T = any> extends Action<T> {
  type: keyof typeof MAP_ACTIONS;
}
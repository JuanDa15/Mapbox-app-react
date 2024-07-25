/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map } from "mapbox-gl";
import { MAP_ACTIONS } from "../reducers";

export interface MapState {
  map?: Map,
  isMapReady: boolean,
  userLocation: [number, number] | undefined;
}
export interface IMapContextProps extends MapState {
  setMap: (map: Map) => void;
  navigateToPlace: (coords: [number, number]) => void;
}
export interface MapAction<T = any> extends Action<T> {
  type: keyof typeof MAP_ACTIONS;
}
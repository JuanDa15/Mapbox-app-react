/* eslint-disable @typescript-eslint/no-explicit-any */
import { Marker } from "mapbox-gl";
import { LOCATION_ACTIONS } from "../reducers";
import { getPlacesByQueryArgs } from "./API";
import { Feature } from "./forwar-geolocation-response";
import { Route } from "./directions-response";

export interface IPlacesContextProps extends IPlacesState {
  getPlacesByQuery: (args: getPlacesByQueryArgs) => void;
  turnOffSearchMode: () => void;
  getRouteLocation: (location: [number, number]) => Promise<void>;
}

export interface IPlacesState {
  searchedPlaces: Feature[];
  isLoadingData: boolean;
  searchMode: boolean;
  markers: Marker[],
  route: {
    selectedRoute: Route | null,
    coords: [number, number] | null
  }
}

export interface LocationAction<T = any> extends Action<T> {
  type: keyof typeof LOCATION_ACTIONS;
}
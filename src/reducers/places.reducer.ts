import { Marker } from "mapbox-gl";
import { Feature, IPlacesState, LocationAction, Route } from "../interfaces";

export const LOCATION_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_SEARCHED_PLACES: 'SET_SEARCHED_PLACES',
  TURN_OFF_SEARCH_MODE: 'TURN_OFF_SEARCH_MODE',
  SET_MARKERS: 'SET_MARKERS',
  SET_ROUTE: 'SET_ROUTE'
}

export const LOCATION_REDUCER_ACTIONS = {
  [LOCATION_ACTIONS.SET_LOADING]: (state: IPlacesState): IPlacesState => ({
    ...state,
    isLoadingData: true,
    searchMode: true
  }),
  [LOCATION_ACTIONS.SET_SEARCHED_PLACES]: (state: IPlacesState, payload: Feature[]): IPlacesState => ({
    ...state,
    searchedPlaces: payload,
    isLoadingData: false,
  }),
  [LOCATION_ACTIONS.TURN_OFF_SEARCH_MODE]: (state: IPlacesState): IPlacesState => ({
    ...state,
    searchMode: false,
    isLoadingData: false,
    searchedPlaces: [],
    route: {
      selectedRoute: null,
      coords: null
    },
    markers: []
  }),
  [LOCATION_ACTIONS.SET_MARKERS]: (state: IPlacesState, payload: Marker[]): IPlacesState => ({
    ...state,
    markers: payload
  }),
  [LOCATION_ACTIONS.SET_ROUTE]: (state: IPlacesState, payload: { selectedRoute: Route | null, coords: [number, number] }): IPlacesState => ({
    ...state,
    route: payload
  })
}

export const placesReducer = <T>(state: IPlacesState, action: LocationAction<T>): IPlacesState => {
  return action.type in LOCATION_REDUCER_ACTIONS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? LOCATION_REDUCER_ACTIONS[action.type](state, action.payload as any)
    : state;
}
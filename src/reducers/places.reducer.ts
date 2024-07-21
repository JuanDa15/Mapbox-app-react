import { Marker } from "mapbox-gl";
import { Feature, IPlacesState, LocationAction } from "../interfaces";

export const LOCATION_ACTIONS = {
  SET_LOCATION: 'SET_LOCATION',
  SET_LOADING: 'SET_LOADING',
  SET_SEARCHED_PLACES: 'SET_SEARCHED_PLACES',
  TURN_OFF_SEARCH_MODE: 'TURN_OFF_SEARCH_MODE',
  SET_MARKERS: 'SET_MARKERS'
}

export const LOCATION_REDUCER_ACTIONS = {
  [LOCATION_ACTIONS.SET_LOCATION]: (state: IPlacesState, payload: [number, number]): IPlacesState => ({
    ...state,
    location: payload,
    isLoading: false
  }),
  [LOCATION_ACTIONS.SET_LOADING]: (state: IPlacesState): IPlacesState => ({
    ...state,
    isLoadingData: true
  }),
  [LOCATION_ACTIONS.SET_SEARCHED_PLACES]: (state: IPlacesState, payload: Feature[]): IPlacesState => ({
    ...state,
    searchedPlaces: payload,
    isLoadingData: false,
    searchMode: (payload.length > 0) ? true : false
  }),
  [LOCATION_ACTIONS.TURN_OFF_SEARCH_MODE]: (state: IPlacesState): IPlacesState => ({
    ...state,
    searchMode: false,
    isLoadingData: false,
    searchedPlaces: []
  }),
  [LOCATION_ACTIONS.SET_MARKERS]: (state: IPlacesState, payload: Marker[]): IPlacesState => ({
    ...state,
    markers: payload
  }),
}

export const placesReducer = <T>(state: IPlacesState, action: LocationAction<T>): IPlacesState => {
  return action.type in LOCATION_REDUCER_ACTIONS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? LOCATION_REDUCER_ACTIONS[action.type](state, action.payload as any)
    : state;
}
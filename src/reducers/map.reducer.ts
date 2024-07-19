import { Map, Marker } from "mapbox-gl"
import { MapAction, MapState } from "../interfaces/map"

export const MAP_ACTIONS = {
  SET_MAP: 'SET_MAP',
  SET_MARKERS: 'SET_MARKERS',
  SET_DIRECTION: 'SET_DIRECTION',
  CLEAR_DIRECTIONS: 'CLEAR_DIRECTIONS',
  SET_DIRECTIONS_MARKERS: 'SET_DIRECTIONS_MARKERS'
}

export const MAP_REDUCER_ACTIONS = {
  [MAP_ACTIONS.SET_MAP]: (state: MapState, payload: Map): MapState => ({
    ...state,
    map: payload,
    isMapReady: true
  }),
  [MAP_ACTIONS.SET_MARKERS]: (state: MapState, payload: Marker[]): MapState => ({
    ...state,
    markers: payload
  }),
  [MAP_ACTIONS.SET_DIRECTION]: (state: MapState, payload: [number, number]): MapState => ({
    ...state,
    directions: [
      ...state.directions,
      payload
    ]
  }),
  [MAP_ACTIONS.CLEAR_DIRECTIONS]: (state: MapState): MapState => ({
    ...state,
    directions: [],
    directionsMarkers: []
  }),
  [MAP_ACTIONS.SET_DIRECTIONS_MARKERS]: (state: MapState, payload: Marker[]): MapState => ({
    ...state,
    directionsMarkers: payload
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapReducer = <T = any>(
  state: MapState,
  action: MapAction<T>
): MapState => {
  return action.type in MAP_REDUCER_ACTIONS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? MAP_REDUCER_ACTIONS[action.type](state, action.payload as any)
    : state;
}
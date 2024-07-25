import { Map } from "mapbox-gl"
import { MapAction, MapState } from "../interfaces/map"

export const MAP_ACTIONS = {
  SET_MAP: 'SET_MAP',
  SET_LOCATION: 'SET_LOCATION',
}

export const MAP_REDUCER_ACTIONS = {
  [MAP_ACTIONS.SET_MAP]: (state: MapState, payload: Map): MapState => ({
    ...state,
    map: payload,
    isMapReady: true
  }),
  [MAP_ACTIONS.SET_LOCATION]: (state: MapState, payload: [number, number]): MapState => ({
    ...state,
    userLocation: payload
  }),
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
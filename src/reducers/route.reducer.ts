import { Marker } from "mapbox-gl"
import { DirectionsResponse, Route, RouteAction, RouteState } from "../interfaces"

export const ROUTE_ACTIONS = {
  SET_ROUTE_DATA: 'SET_ROUTE_DATA',
  SET_DIRECTION: 'SET_DIRECTION',
  CLEAR_DIRECTIONS: 'CLEAR_DIRECTIONS',
  SET_DIRECTION_MARKERS: 'SET_DIRECTION_MARKERS',
  SET_ACTIVE_ROUTE: 'SET_ACTIVE_ROUTE'
}

export const ROUTE_REDUCER_ACTIONS = {
  [ROUTE_ACTIONS.SET_ROUTE_DATA]: (state: RouteState, payload: DirectionsResponse | undefined): RouteState => ({
    ...state,
    routes: payload
  }),
  [ROUTE_ACTIONS.SET_DIRECTION]: (state: RouteState, payload: [number, number]): RouteState => ({
    ...state,
    routeMode: true,
    directions: [
      ...state.directions,
      payload
    ]
  }),
  [ROUTE_ACTIONS.CLEAR_DIRECTIONS]: (state: RouteState): RouteState => ({
    ...state,
    routeMode: false,
    directions: [],
    routes: undefined,
    directionsMarkers: []
  }),
  [ROUTE_ACTIONS.SET_DIRECTION_MARKERS]: (state: RouteState, payload: Marker[]): RouteState => ({
    ...state,
    directionsMarkers: payload
  }),
  [ROUTE_ACTIONS.SET_ACTIVE_ROUTE]: (state: RouteState, payload: Route | null): RouteState => ({
    ...state,
    activeRoute: payload
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routeReducer = <T = any>(
  state: RouteState,
  action: RouteAction<T>
): RouteState => {
  return action.type in ROUTE_REDUCER_ACTIONS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? ROUTE_REDUCER_ACTIONS[action.type](state, action.payload as any)
    : state
}
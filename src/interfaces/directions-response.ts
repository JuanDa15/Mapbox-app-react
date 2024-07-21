import { Geometry } from "./forwar-geolocation-response";

export interface DirectionsResponse {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export enum Type {
  LineString = "LineString",
}

export interface Leg {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  via_waypoints: any[];
  annotation: Annotation;
  admins: Admin[];
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

export interface Annotation {
  distance: number[];
  duration: number[];
}

export interface Step {
  intersections: Intersection[];
  maneuver: Maneuver;
  name: string;
  duration: number;
  distance: number;
  driving_side: string;
  weight: number;
  mode: string;
  geometry: Geometry;
}

export interface Intersection {
  entry: boolean[];
  bearings: number[];
  duration?: number;
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?: boolean;
  admin_index: number;
  out?: number;
  weight?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  turn_weight?: number;
  turn_duration?: number;
}

export interface MapboxStreetsV8 {
  class: Class;
}

export enum Class {
  Secondary = "secondary",
  Street = "street",
  Tertiary = "tertiary",
}

export interface Maneuver {
  type: string;
  instruction: string;
  bearing_after: number;
  bearing_before: number;
  location: number[];
  modifier?: string;
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}

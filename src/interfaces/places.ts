/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOCATION_ACTIONS } from "../reducers";

export interface IPlacesContextProps extends IPlacesState { }

export interface IPlacesState {
  isLoading: boolean;
  location: [number, number] | undefined;
}

export interface LocationAction<T = any> extends Action<T> {
  type: keyof typeof LOCATION_ACTIONS;
}
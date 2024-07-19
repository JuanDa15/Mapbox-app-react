import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { placesReducer } from '../reducers';
import { getLocation } from '../helpers';
import {
  getPlacesByQueryArgs,
  IPlacesContextProps,
  IPlacesState,
} from '../interfaces';
import forwardSearchApi from '../API/forward-geolocation';
import { ForwardGeolocationResponse } from '../interfaces';

const INITIAL_STATE: IPlacesState = {
  isLoading: true,
  location: undefined,
  searchedPlaces: [],
  isLoadingData: false,
};

export const PlacesContext = createContext<IPlacesContextProps>(
  {} as IPlacesContextProps
);

export const PlacesProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    const initializeLocation = async () => {
      const resp = await getLocation().catch(console.log);
      dispatch({
        type: 'SET_LOCATION',
        payload: resp,
      });
    };

    initializeLocation();
  }, []);

  const getPlacesByQuery = async ({ q, limit = '5' }: getPlacesByQueryArgs) => {
    if (q.length === 0)
      return dispatch({ type: 'SET_SEARCHED_PLACES', payload: [] });

    dispatch({ type: 'SET_LOADING' });
    const {
      data: { features },
    } = await forwardSearchApi.get<ForwardGeolocationResponse>('', {
      params: {
        q,
        limit,
        proximity: state.location?.join(','),
      },
    });

    dispatch({ type: 'SET_SEARCHED_PLACES', payload: features });
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        getPlacesByQuery,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

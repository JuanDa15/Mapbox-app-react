import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { placesReducer } from '../reducers';
import { getLocation } from '../helpers';
import {
  getPlacesByQueryArgs,
  IPlacesContextProps,
  IPlacesState,
} from '../interfaces';
import forwardSearchApi from '../API/forward-geolocation';

const INITIAL_STATE: IPlacesState = {
  isLoading: true,
  location: undefined,
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
    const { data } = await forwardSearchApi.get('', {
      params: {
        q,
        limit,
        proximity: state.location?.join(','),
      },
    });
    console.log(data);
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

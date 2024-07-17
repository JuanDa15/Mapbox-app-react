import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { placesReducer } from '../reducers';
import { getLocation } from '../helpers';
import { IPlacesContextProps, IPlacesState } from '../interfaces';

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

  return (
    <PlacesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

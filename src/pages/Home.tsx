import { useContext } from 'react';
import {
  MapView,
  NavigateToUserLocation,
  SearchBar,
  AddDirection,
} from '../components';
import { RouteSelector } from '../components/RouteSelector';
import { PlacesContext, RouteContext } from '../context';

export const HomePage = (): JSX.Element => {
  const { searchMode } = useContext(PlacesContext);
  const { routeMode } = useContext(RouteContext);
  return (
    <>
      {!routeMode || (!searchMode && !routeMode) ? <SearchBar /> : <></>}
      <NavigateToUserLocation />
      <MapView />
      {!searchMode || (!searchMode && !routeMode) ? (
        <>
          {' '}
          <AddDirection />
          <RouteSelector />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

import { useContext } from 'react';
import { PlacesContext, RouteContext } from '../context';
import {
  AddDirection,
  MapView,
  NavigateToUserLocation,
  SearchBar,
} from '../components';
import { RouteSelector } from '../components/RouteSelector';

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

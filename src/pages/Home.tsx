import { MapView, NavigateToUserLocation, SearchBar } from '../components';

export const HomePage = (): JSX.Element => {
  return (
    <>
      <SearchBar />
      <NavigateToUserLocation />
      <MapView />
    </>
  );
};

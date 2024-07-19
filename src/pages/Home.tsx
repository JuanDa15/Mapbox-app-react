import {
  MapView,
  NavigateToUserLocation,
  SearchBar,
  AddDirection,
} from '../components';

export const HomePage = (): JSX.Element => {
  return (
    <>
      <SearchBar />
      <NavigateToUserLocation />
      <MapView />
      <AddDirection />
    </>
  );
};

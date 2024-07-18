import { MapView, NavigateToUserLocation } from '../components';

export const HomePage = (): JSX.Element => {
  return (
    <>
      <MapView />
      <NavigateToUserLocation />
    </>
  );
};

import { useContext } from 'react';
import { LocaleDefineIcon } from '../icons';
import { MapContext } from '../context';

export const NavigateToUserLocation = (): JSX.Element => {
  const { isMapReady, navigateToPlace, userLocation } = useContext(MapContext);

  const handleClick = () => {
    if (!userLocation) return;
    const [lng, lat] = userLocation;
    navigateToPlace([lng, lat]);
  };

  if (!isMapReady) return <></>;

  return (
    <button
      className='z-[100] absolute top-3 right-3 text-white rounded-full p-4 bg-purple-300 bg-opacity-20  hover:bg-purple-600  active:bg-purple-700 transition-colors'
      onClick={handleClick}
      title='Go to your location'
    >
      <LocaleDefineIcon width='32' height='32' />
    </button>
  );
};

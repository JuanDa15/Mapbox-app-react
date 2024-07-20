import { useContext } from 'react';
import { LocaleDefineIcon } from '../icons';
import { MapContext, PlacesContext } from '../context';

export const NavigateToUserLocation = (): JSX.Element => {
  const { isMapReady, navigateToPlace } = useContext(MapContext);
  const { location } = useContext(PlacesContext);

  const handleClick = () => {
    if (!location) return;
    const [lng, lat] = location;
    navigateToPlace([lng, lat]);
  };

  if (!isMapReady) return <></>;

  return (
    <button
      className='z-[100] absolute top-3 right-3 text-white rounded-full p-4 bg-purple-300 bg-opacity-20  hover:bg-purple-600  active:bg-purple-700 transition-colors'
      onClick={handleClick}
    >
      <LocaleDefineIcon width='32' height='32' />
    </button>
  );
};
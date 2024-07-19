import { useContext } from 'react';
import { MapPointIcon } from '../icons';
import { MapContext } from '../context';

export const AddDirection = (): JSX.Element => {
  const { map, addDirection } = useContext(MapContext);

  // Add MOuse follower with the this icon
  // Add button to reset directions, add a way to create a petition to each center
  // Add functinality to create route between user location and direction

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clickListener = (e: any) => {
      const { lng, lat } = e.lngLat;
      addDirection([lng, lat]);
      map!.getCanvas().style.cursor = '';
      map?.off('click', clickListener);
    };
    map!.getCanvas().style.cursor = 'pointer';
    map?.on('click', clickListener);
  };

  return (
    <button
      className='z-[100] absolute top-24 right-3 text-white rounded-full p-4 bg-purple-300 bg-opacity-20  hover:bg-purple-600  active:bg-purple-700 transition-colors'
      onClick={handleClick}
    >
      <MapPointIcon width='24' height='24' />
    </button>
  );
};

import { useContext } from 'react';
import { MapPointIcon } from '../icons';
import { MapContext, PlacesContext, RouteContext } from '../context';
import { XIcon } from '../icons/XIcon';

export const AddDirection = (): JSX.Element => {
  const { map } = useContext(MapContext);
  const { searchMode, turnOffSearchMode } = useContext(PlacesContext);
  const { addDirection, routeMode, turnOffRouteMode } =
    useContext(RouteContext);

  // Add MOuse follower with the this icon
  // TODO: add a way to create a petition to each center
  // TODO:  Mover la key a los env
  // TODO: optimize build with lazy load

  const handleClick = () => {
    searchMode && turnOffSearchMode();
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
    <>
      <button
        className={`z-[100] absolute top-24 right-3 text-white rounded-full p-4 bg-purple-300 bg-opacity-20  hover:bg-purple-600  active:bg-purple-700 transition-colors ${
          routeMode ? 'bg-purple-700 bg-opacity-100' : ''
        }`}
        onClick={handleClick}
        title='Add waypoint to create route'
      >
        <MapPointIcon width='24' height='24' />
      </button>
      {routeMode ? (
        <button
          type='button'
          onClick={turnOffRouteMode}
          className='z-[100] absolute top-[9.8rem] right-5 text-white rounded-full p-2 bg-purple-300 bg-opacity-20  hover:bg-purple-600  active:bg-purple-700 transition-colors'
          title='Exit route mode'
        >
          <XIcon />
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

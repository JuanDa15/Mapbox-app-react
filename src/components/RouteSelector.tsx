import { useContext } from 'react';
import { RouteContext } from '../context';
import { Route } from '../interfaces';

export const RouteSelector = (): JSX.Element => {
  const { routes, activeRoute, selectActiveRoute } = useContext(RouteContext);

  if (routes?.routes.length === 0 || !routes) return <></>;

  const handleClick = (route: Route) => {
    return () => {
      selectActiveRoute(route);
    };
  };

  const routePosition = () => {
    if (activeRoute === null) return -1;

    const index = routes?.routes.findIndex(
      (route) => JSON.stringify(route) === JSON.stringify(activeRoute)
    );
    return index;
  };

  return (
    <div className='absolute top-2 left-[50%] rounded-md overflow-hidden'>
      {routes?.routes.map((route, index) => (
        <button
          className={`p-2  ${
            routePosition() === index ? 'bg-purple-600' : 'bg-gray-700'
          }`}
          type='button'
          key={`route-${index}`}
          onClick={handleClick(route)}
        >
          Route {index}
        </button>
      ))}
    </div>
  );
};

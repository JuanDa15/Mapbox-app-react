import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { DataLoader } from './DataLoader';
import { MapIcon, MapPinIcon } from '../icons';
import { Feature } from '../interfaces';

export const SearchResults = (): JSX.Element => {
  const { isLoadingData, searchedPlaces } = useContext(PlacesContext);
  const { navigateToPlace } = useContext(MapContext);

  const [activePlace, setActivePlace] = useState('');

  const handleClick = (place: Feature) => {
    return () => {
      const [lng, lat] = place.geometry.coordinates;
      setActivePlace(place.id);
      navigateToPlace([lng, lat]);
    };
  };

  if (isLoadingData) {
    return (
      <div className='h-[100px] grid place-items-center bg-purple-600 mt-1 rounded-xl'>
        <DataLoader />
      </div>
    );
  }
  return (
    <ul className='bg-purple-800 mt-1 rounded-xl overflow-hidden'>
      {searchedPlaces.map((item) => (
        <li
          key={item.id}
          className={`py-2 px-3 ${
            activePlace === item.id ? 'bg-yellow-600' : ''
          }`}
        >
          <p>
            <b>{item.properties.name}</b>
          </p>
          <hr />
          <p className='flex flex-row gap-2 mt-2 items-center'>
            <MapPinIcon width='18' height='18' />
            <small>{item.properties.name_preferred}</small>
          </p>
          <p className='flex flex-row gap-2 mt-1'>
            <MapIcon width='18' height='18' />
            <small>{item.properties.place_formatted}</small>
          </p>

          <button
            onClick={handleClick(item)}
            className='py-2 px-3 rounded-full bg-teal-700 text-white mt-2 w-full hover:bg-teal-600 hover:text-teal-200 transition-colors'
          >
            <b>Navigate to</b>
          </button>
        </li>
      ))}
    </ul>
  );
};

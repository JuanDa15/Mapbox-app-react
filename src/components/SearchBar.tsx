import { ChangeEventHandler, useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = (): JSX.Element => {
  const debounceRef = useRef<number>();
  const { getPlacesByQuery, turnOffSearchMode } = useContext(PlacesContext);

  const onQueryChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (value.length === 0) {
      return turnOffSearchMode();
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      getPlacesByQuery({
        q: value,
        limit: '5',
      });
    }, 300);
  };

  return (
    <>
      <div className='z-[100] absolute top-3 left-3 p-1 bg-purple-600 bg-opacity-40 rounded-xl flex flex-col'>
        <input
          type='search'
          className='border-[1px] bg-transparent rounded-lg py-2 px-3 outline-none min-w-[250px]'
          placeholder='search a place...'
          onChange={onQueryChanged}
        />
        <SearchResults />
      </div>
    </>
  );
};

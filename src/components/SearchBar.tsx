import { ChangeEventHandler, useRef } from 'react';

export const SearchBar = (): JSX.Element => {
  const debounceRef = useRef<number>();

  const onQueryChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  return (
    <>
      <div className='z-[100] absolute top-3 left-3 p-1 bg-purple-600 bg-opacity-40 rounded-xl'>
        <input
          type='search'
          className='border-[1px] bg-transparent rounded-lg py-2 px-3 outline-none min-w-[250px]'
          placeholder='search a place...'
          onChange={onQueryChanged}
        />
      </div>
    </>
  );
};

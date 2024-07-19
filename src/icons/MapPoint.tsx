export const MapPointIcon = ({ width = '24', height = '24' }): JSX.Element => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      width={width}
      height={height}
    >
      <g stroke='currentColor' strokeWidth='1.5'>
        <path
          opacity='.5'
          d='M4 10.143C4 5.646 7.582 2 12 2s8 3.646 8 8.143c0 4.462-2.553 9.67-6.537 11.531a3.45 3.45 0 0 1-2.926 0C6.553 19.812 4 14.605 4 10.144Z'
        />
        <circle cx='12' cy='10' r='4' />
        <path d='M10.5 10h3M12 11.5v-3' strokeLinecap='round' />
      </g>
    </svg>
  );
};

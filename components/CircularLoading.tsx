import React from 'react';

const Loading: React.FC<{ className?: string; fill?: string }> = ({
  className,
  fill,
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className}>
    <path
      fill={fill}
      d="M50.287,32A18.287,18.287,0,1,1,32,13.713a1.5,1.5,0,1,1,0,3A15.287,15.287,0,1,0,47.287,32a1.5,1.5,0,0,1,3,0Z"
      // dataname="Loading1"
    />
  </svg>
);

const CircularLoading = () => {
  return (
    <div>
      <Loading className="w-10 h-10 animate-spin" fill="#333" />
    </div>
  );
};

export default CircularLoading;

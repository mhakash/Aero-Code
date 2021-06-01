import React, { FC } from 'react';

import AsyncImage from 'components/AsyncImage';

const Home: FC = () => {
  return (
    <div className="m-4 ">
      <div className="text-2xl mb-4">Hello from Home</div>
      <AsyncImage src="test" />
    </div>
  );
};

export default Home;

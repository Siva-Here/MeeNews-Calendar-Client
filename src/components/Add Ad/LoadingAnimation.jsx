import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="mx-[20%] md:mx-auto ">
      <div class="flex flex-row gap-2">
      <div class="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
      <div class="flex flex-col gap-2">
        <div class="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
        <div class="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
      </div>
    </div>
    </div>


  );
};

export default LoadingAnimation;
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse cursor-pointer h-[250px] md:h-[320px] mt-4 flex flex-col gap-0 text-sm border p-0  w-[100%] md:w-[100%] rounded-xl overflow-hidden">
      
      <div className="bg-gray-100 h-[60%] w-full"></div>

      <div className="flex flex-col gap-2 p-4">
        <div className="bg-gray-100 h-4 w-[80%] rounded"></div>
        <div className="bg-gray-100 h-4 w-[60%] rounded"></div>
        <div className="bg-gray-100 h-4 w-[90%] rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

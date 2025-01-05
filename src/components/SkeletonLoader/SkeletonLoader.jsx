import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse cursor-pointer h-[250px] md:h-[320px] mt-4 flex flex-col gap-0 text-sm border border-[#fff157] p-0  w-[100%] md:w-[100%] rounded-xl overflow-hidden">
      <div className="border border-[#fff157] h-[60%] w-full"></div>

      <div className="flex flex-col gap-2 p-4">
        <div className="border border-[#fff157] h-4 w-[80%] rounded-full"></div>
        <div className="border border-[#fff157] h-4 w-[60%] rounded-full"></div>
        <div className="border border-[#fff157] h-4 w-[90%] rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

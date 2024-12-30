import React, { useState } from "react";
import filterIcon from "../../assets/filter.svg";
import { FILTERBY } from "../../utils/Data";

const Filter = ({ onSortToggle, isSorted }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = (filterName) => {
    setSelectedFilter(selectedFilter === filterName ? null : filterName);
  };

  const renderOptions = () => {
    const activeFilter = FILTERBY.find(
      (filter) => filter.name === selectedFilter
    );
    return activeFilter
      ? activeFilter.options.map((item) => (
          <div
            key={item}
            className="bg-[#ff080020] rounded-full flex justify-center items-center px-4 py-2 min-w-[150px] cursor-pointer"
          >
            <p className="text-[10px] lg:text-[16px] font-medium">{item}</p>
          </div>
        ))
      : null;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full mt-4 lg:mt-8 flex justify-between items-center">
        <div className="flex gap-2 lg:gap-4 items-center">
          <div className="flex gap-2 items-center">
            <img src={filterIcon} alt="" />
            <p className="hidden lg:block text-[24px]">Filter by:</p>
          </div>
          <div className="flex gap-2">
            {FILTERBY.map((filter) => (
              <div
                key={filter.name}
                className={`bg-[#fff15750] rounded-full flex justify-center items-center px-4 py-2 cursor-pointer ${
                  selectedFilter === filter.name
                    ? "border border-[#1d1d1f]"
                    : ""
                }`}
                onClick={() => handleFilterClick(filter.name)}
              >
                <p className="text-[10px] lg:text-[16px] font-medium">
                  {filter.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div onClick={onSortToggle}  className={`px-4 py-2 border border-[#FF0800] rounded-full cursor-pointer ${
          isSorted && "bg-red-500 text-[#FFF157]" 
        }`}>
          <p  className='font-medium text-[10px] lg:text-[16px] '>A - Z</p>
        </div>
      </div>
      <div className="flex gap-2 lg:flex-wrap px-0 lg:px-4 overflow-x-auto">
        {renderOptions()}
      </div>
    </div>
  );
};

export default Filter;

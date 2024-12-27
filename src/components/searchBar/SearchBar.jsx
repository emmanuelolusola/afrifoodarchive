import React from "react";
import searchIcon from "../../assets/search.svg";
import closeIcon from "../../assets/cancel.svg";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full mt-2 lg:mt-4 py-2 lg:py-4 px-4 lg:px-8 lg:w-[50%] bg-[#ff080020] rounded-full lg:mx-auto flex justify-between items-center">
      <div className="flex gap-2 lg:gap-4">
        <img src={searchIcon} alt="" className="w-[32px] lg:w-[48px]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent custom-input lg:text-[24px]"
          placeholder="Search"
        />
      </div>
      <img
        src={closeIcon}
        alt="Clear"
        className="cursor-pointer"
        onClick={() => setSearchQuery("")}
      />
    </div>
  );
};

export default SearchBar;

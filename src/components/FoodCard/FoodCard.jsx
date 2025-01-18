import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const FoodCard = ({
  name,
  youtube,
  category,
  description,
  image,
  demography,
  onView
}) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="cursor-pointer h-[250px] lg:h-[320px] mt-4 flex flex-col gap-0 text-sm border p-0 border-[#FF0800] w-[100%] md:w-[100%] rounded-xl overflow-hidden">
      <div className="relative group h-[65%] w-full"  onClick={onView}>
        <img className="h-full w-full object-cover" src={image} alt={name} />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" >
          <p className="text-white text-lg">{name}</p>
        </div>
      </div>
      <div className="px-2 lg:px-4 py-2 h-[35%] bg-[#FFDAA8]">
        <p className="font-medium text-base md:text-xl">{name}</p>
        <p className="text-[#777777] text-[10px] md:text-sm">{category}</p>
        <div className="flex justify-between items-center pt-1 lg:pt-4">
          {isHeartFilled ? (
            <FaHeart
              className="w-[16px] h-[16px]  lg:w-[22px] lg:h-[22px]"
              color="#FF0800"
              onClick={toggleHeart}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaRegHeart
              className="w-[16px] h-[16px] lg:w-[22px] lg:h-[22px]"
              color="#FF0800"
              onClick={toggleHeart}
              style={{ cursor: "pointer" }}
            />
          )}

          <button onClick={onView} className="bg-[#FF0800] text-[#FFF157] px-3 lg:px-6 text-[10px] lg:text-sm py-0 lg:py-1 rounded-3xl">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

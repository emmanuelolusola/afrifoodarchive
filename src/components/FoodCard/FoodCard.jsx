import React, { useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const FoodCard = ({ name, youtube, category, description, image, demography }) => {

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  
  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="cursor-pointer h-[300px] md:h-[340px] mt-10 flex flex-col gap-0 text-sm border p-0 border-[#FF0800] w-[100%] md:w-[100%] rounded-xl overflow-hidden">
      <img
        className="h-[65%] w-full object-cover"
        src={image}
        alt={name}
      />
      <div className='px-4 py-2 h-[35%] bg-[#FFDAA8]'>
        <p className="font-medium text-base md:text-2xl">{name}</p>
        <p className='text-[#777777] text-[10px] md:text-sm'>{category}</p>
        <div className='flex justify-between items-center pt-3'>
          {isHeartFilled ? (
            <FaHeart className='w-[16px] h-[16px]  md:w-[24px] md:h-[24px]' color='#FF0800' onClick={toggleHeart} style={{ cursor: 'pointer' }} />
          ) : (
            <FaRegHeart className='w-[16px] h-[16px] md:w-[24px] md:h-[24px]' color='#FF0800' onClick={toggleHeart} style={{ cursor: 'pointer' }} />
          )}
           
          <button className='bg-[#FF0800] text-[#FFF157] px-3 md:px-6 text-[10px] md:text-base py-1 rounded-3xl'>View</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
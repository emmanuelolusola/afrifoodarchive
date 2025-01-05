import { useState } from 'react';
import cancel from '../../assets/hugeicons_cancel-circle.png';
import { FaRegHeart, FaHeart } from "react-icons/fa";

const FoodModal = ({ food, onClose }) => {
  const { Name, Image, Description, Category, Demography, Youtube } = food;
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="mt-40 w-full lg:w-[900px] h-full lg:h-[70%] bg-white fixed inset-0 m-auto flex flex-col lg:flex-row items-center justify-center z-20 border border-[#FF0800] rounded-2xl overflow-auto">
      <div className="w-full lg:w-[45%] h-full">
        <img
          src={Image?.[0]?.url || "/placeholder.jpg"}
          alt={Name || "Food"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-[55%] bg-[#FFDAA8] h-full flex flex-col p-5">
        <img src={cancel} alt="Close" className="hidden lg:block self-end cursor-pointer" onClick={onClose} />
        <div className="flex flex-col gap-1 py-3">
          <h1 className="text-[42px] text-black font-bold">{Name || "No Name Available"}</h1>
          <div className="flex items-center gap-3 text-[14px]">
            <p className="border border-black rounded-3xl bg-[#FFF15780] py-1 px-3">
              {Category || "Uncategorized"}
            </p>
            <p className="border border-black rounded-3xl bg-[#FF080033] py-1 px-3">
              {Demography || "Not specified"}
            </p>
          </div>
        </div>
        <div
          className="py-3 text-[14px] overflow-y-auto"
          style={{ maxHeight: "450px" }} 
        >
          {Description || "No description available."}
        </div>
        <div className="mt-auto flex justify-between items-center py-3">
          <button className="text-[#FFF157] font-semibold text-[22px] bg-[#FF0800] py-1 px-5 rounded-3xl" onClick={() => window.open(food.Youtube, '_blank')}>
            Learn how to make
          </button>
          <div>
            {isHeartFilled ? (
              <FaHeart
                className="w-[16px] h-[16px] md:w-[22px] md:h-[22px]"
                color="#FF0800"
                onClick={toggleHeart}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                className="w-[16px] h-[16px] md:w-[22px] md:h-[22px]"
                color="#FF0800"
                onClick={toggleHeart}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;

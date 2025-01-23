import React, { useState } from "react";
import cancel from "../../assets/hugeicons_cancel-circle.png";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const FoodModal = ({ food, onClose }) => {
  console.log("Food Data in Modal:", food);

  const Name = food?.Name || "No Name Available";
  const Image = food?.Image[0].url || "/placeholder.jpg";
  const Description = food?.Description || "No description available.";
  const Category = food?.Category || "Uncategorized";
  const Demography = food?.Demography || "Not specified";
  const Youtube = food?.Youtube || "#";

  return (
    <div className="mt-40 w-full lg:w-[900px] h-full lg:h-[70%] bg-white fixed inset-0 m-auto flex flex-col lg:flex-row items-center justify-center z-20 border border-[#FF0800] rounded-2xl overflow-auto">
      <div className="w-full lg:w-[45%] h-full">
        <img
          src={Image}
          alt={Name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-[55%] bg-[#FFDAA8] h-full flex flex-col p-5">
        <img
          src={cancel}
          alt="Close"
          className="hidden lg:block self-end cursor-pointer"
          onClick={onClose}
        />
        <div className="flex flex-col gap-1 py-3">
          <h1 className="text-[42px] text-black font-bold">{Name}</h1>
          <div className="flex items-center gap-3 text-[14px]">
            <p className="border border-black rounded-3xl bg-[#FFF15780] py-1 px-3">
              {Category}
            </p>
            <p className="border border-black rounded-3xl bg-[#FF080033] py-1 px-3">
              {Demography}
            </p>
          </div>
        </div>
        <div
          className="py-3 pl-[10px] text-[14px] text-justify overflow-y-auto"
          style={{ maxHeight: "450px" }}
        >
          {Description}
        </div>
        <div className="mt-auto flex justify-between items-center py-3">
          <button
            className="text-[#FFF157] font-semibold text-[22px] bg-[#FF0800] py-1 px-5 rounded-3xl"
            onClick={() => window.open(Youtube, "_blank")}
          >
            Learn how to make
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default FoodModal;


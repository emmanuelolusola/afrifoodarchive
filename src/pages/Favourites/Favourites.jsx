import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import FoodCard from "../../components/FoodCard/FoodCard";
import cancel from "../../assets/hugeicons_cancel-circle.png";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../../../redux/favouritesSlice";

const Favourites = () => {
  const favorites = useSelector((state) => state.favorites);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  // Check if the screen is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    if (isMobile) {
      setIsDrawerOpen(true); // Open drawer on mobile
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedFood(null); // Reset selected food on close
  };

  const toggleFavorite = (food) => {
    const isFavorite = favorites.some((item) => item.ID === food.ID);
    if (isFavorite) {
      dispatch(removeFavorite({ ID: food.ID }));
    } else {
      dispatch(addFavorite(food));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex gap-5 lg:gap-10 items-center mt-10 lg:mt-20 px-[20px] md:px-[80px] lg:px-[150px]">
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5 md:grid-cols-3">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <FoodCard
                key={item.ID}
                {...item} // Spread the item's properties directly
                onView={() => handleFoodSelect(item)}
              />
            ))
          ) : (
            <p>No favorites added yet.</p>
          )}
        </div>
      </div>

      {/* Drawer for Mobile */}
      <Drawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        direction="bottom"
        size={560}
        className="w-full bg-[#FFDAA8] overflow-y-auto rounded-t-3xl border border-[#FF0800] overflow-hidden"
      >
        {selectedFood && (
          <div className="w-full">
          <img
            src={selectedFood.image|| "/placeholder.jpg"}
            alt={selectedFood.name || "Food"}
            className="w-full h-64 object-cover"
          />
          <div className="bg-[#FFDAA8] p-4 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{selectedFood.name || "No Name Available"}</h1>
            <div className="flex items-center gap-3 text-[14px]">
              <p className="border text-[10px] border-black rounded-3xl bg-[#FFF15780] py-1 px-3">
                {selectedFood.category || "Uncategorized"}
              </p>
              <p className="border  text-[10px] border-black rounded-3xl bg-[#FF080033] py-1 px-3">
                {selectedFood.demography || "Not specified"}
              </p>
            </div>
            <div className="py-3 text-[14px] text-justify overflow-y-auto" style={{ maxHeight: "450px" }}>
              {selectedFood.description || "No description available."}
            </div>
            <div className="flex justify-between items-center">
              <button
                className="text-[#FFF157] font-semibold text-[18px] bg-[#FF0800] py-1 px-5 rounded-3xl"
                onClick={() => window.open(selectedFood.youtube, "_blank")}
              >
                Learn how to make
              </button>
              {favorites.some((item) => item.ID === selectedFood.ID) ? (
                <FaHeart
                  className="w-[25px] h-[25px] cursor-pointer text-[#FF0800]"
                  onClick={() => toggleFavorite(selectedFood)}
                />
              ) : (
                <FaRegHeart
                  className="w-[25px] h-[25px] cursor-pointer text-[#FF0800]"
                  onClick={() => toggleFavorite(selectedFood)}
                />
              )}
            </div>
          </div>
        </div>
        )}
      </Drawer>

      {/* Modal for Non-Mobile */}
      {selectedFood && !isMobile && (
          <div className="mt-40 w-full lg:w-[900px] h-full lg:h-[70%] bg-white fixed inset-0 m-auto flex flex-col lg:flex-row items-center justify-center z-20 border border-[#FF0800] rounded-2xl overflow-auto">
          <div className="w-full lg:w-[45%] h-full">
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-[55%] bg-[#FFDAA8] h-full flex flex-col p-5">
            <img
              src={cancel}
              alt="Close"
              className="hidden lg:block self-end cursor-pointer"
              onClick={() => setSelectedFood(null)}
            />
            <div className="flex flex-col gap-1 py-3">
              <h1 className="text-[42px] text-black font-bold">{selectedFood.name}</h1>
              <div className="flex items-center gap-3 text-[14px]">
                <p className="border border-black rounded-3xl bg-[#FFF15780] py-1 px-3">
                  {selectedFood.category}
                </p>
                <p className="border border-black rounded-3xl bg-[#FF080033] py-1 px-3">
                  {selectedFood.demography}
                </p>
              </div>
            </div>
            <div
              className="py-3 pl-[10px] text-[14px] text-justify overflow-y-auto"
              style={{ maxHeight: "450px" }}
            >
              {selectedFood.description}
            </div>
            <div className="mt-auto flex justify-between items-center py-3">
              <button
                className="text-[#FFF157] font-semibold text-[22px] bg-[#FF0800] py-1 px-5 rounded-3xl"
                onClick={() => window.open(selectedFood.youtube, "_blank")}
              >
                Learn how to make
              </button>
              {favorites.some((item) => item.ID === selectedFood.ID) ? (
                <FaHeart
                  className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] cursor-pointer text-[#FF0800]"
                  onClick={() => toggleFavorite(selectedFood)}
                />
              ) : (
                <FaRegHeart
                  className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] cursor-pointer text-[#FF0800]"
                  onClick={() => toggleFavorite(selectedFood)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;

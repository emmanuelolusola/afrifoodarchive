import { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import base from "../../api/base";
import FoodCard from "../../components/FoodCard/FoodCard";
import Filter from "../../components/filter/Filter";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../../redux/favouritesSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import cancel from "../../assets/hugeicons_cancel-circle.png";

const FoodArchive = ({ searchQuery }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await base("Foods").select({ view: "Grid view" }).all();
        setFoods(records);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSortToggle = () => setIsSorted((prev) => !prev);

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    if (isMobile) setIsDrawerOpen(true);
  };

  const toggleFavorite = (food) => {
    const isFavorite = favorites.some((item) => item.ID === food.id);
    const favoriteFood = {
      ID: food.id,
      name: food.fields.Name,
      image: food.fields.Image?.[0]?.url,
      category: food.fields.Category,
      youtube: food.fields.Youtube,
      demography: food.fields.Demography,
      description: food.fields.Description,
    };
  
    if (isFavorite) {
      dispatch(removeFavorite({ ID: food.id }));
    } else {
      dispatch(addFavorite(favoriteFood));
    }
  };
  

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedFood(null);
  };

  const filteredFoods = foods
    .filter((food) => {
      const name = food.fields.Name?.toLowerCase() || "";
      const category = food.fields.Category?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return name.includes(query) || category.includes(query);
    })
    .sort((a, b) => {
      if (!isSorted) return 0;
      const nameA = a.fields.Name?.toLowerCase() || "";
      const nameB = b.fields.Name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    });

  const groupedFoods = filteredFoods.reduce((groups, food) => {
    const name = food.fields.Name?.toLowerCase() || "";
    const firstLetter = name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) groups[firstLetter] = [];
    groups[firstLetter].push(food);
    return groups;
  }, {});

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <div className={`${selectedFood ? "blur-sm" : ""} transition-all duration-300`}>
        <Filter onSortToggle={handleSortToggle} isSorted={isSorted} />

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <div className="p-0">
            {isSorted ? (
              Object.keys(groupedFoods).map((letter) => (
                <div key={letter}>
                  <div className="flex gap-5 lg:gap-10 items-center mt-10">
                    <h2 className="text-[24px] lg:text-[40px] font-bold text-[#777777]">{letter}</h2>
                    <div className="h-[1px] w-full bg-[#777777]"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
                    {groupedFoods[letter].map((food) => (
                      <FoodCard
                        key={food.id}
                        ID={food.id}
                        name={food.fields.Name || "No Name Available"}
                        youtube={food.fields.Youtube || "#"}
                        category={food.fields.Category || "Uncategorized"}
                        description={food.fields.Description || "No description provided"}
                        image={food.fields.Image?.[0]?.url || "/placeholder.jpg"}
                        demography={food.fields.Demography || "Not specified"}
                        onView={() => handleFoodSelect(food)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
                {filteredFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    ID={food.id}
                    name={food.fields.Name || "No Name Available"}
                    youtube={food.fields.Youtube || "#"}
                    category={food.fields.Category || "Uncategorized"}
                    description={food.fields.Description || "No description provided"}
                    image={food.fields.Image?.[0]?.url || "/placeholder.jpg"}
                    demography={food.fields.Demography || "Not specified"}
                    onView={() => handleFoodSelect(food)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
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
              src={selectedFood.fields.Image?.[0]?.url || "/placeholder.jpg"}
              alt={selectedFood.fields.Name || "Food"}
              className="w-full h-64 object-cover"
            />
            <div className="bg-[#FFDAA8] p-4 flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{selectedFood.fields.Name || "No Name Available"}</h1>
              <div className="flex items-center gap-3 text-[14px]">
                <p className="border text-[10px] border-black rounded-3xl bg-[#FFF15780] py-1 px-3">
                  {selectedFood.fields.Category || "Uncategorized"}
                </p>
                <p className="border text-[10px] border-black rounded-3xl bg-[#FF080033] py-1 px-3">
                  {selectedFood.fields.Demography || "Not specified"}
                </p>
              </div>
              <div className="py-3 text-[14px] text-justify overflow-y-auto" style={{ maxHeight: "450px" }}>
                {selectedFood.fields.Description || "No description available."}
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="text-[#FFF157] font-semibold text-[18px] bg-[#FF0800] py-1 px-5 rounded-3xl"
                  onClick={() => window.open(selectedFood.fields.Youtube, "_blank")}
                >
                  Learn how to make
                </button>
                {favorites.some((item) => item.ID === selectedFood.id) ? (
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
              src={selectedFood.fields.Image?.[0]?.url || "/placeholder.jpg"}
              alt={selectedFood.fields.Name || "Food"}
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
              <h1 className="text-[42px] text-black font-bold">{selectedFood.fields.Name}</h1>
              <div className="flex items-center gap-3 text-[14px]">
                <p className="border border-black rounded-3xl bg-[#FFF15780] py-1 px-3">
                  {selectedFood.fields.Category}
                </p>
                <p className="border border-black rounded-3xl bg-[#FF080033] py-1 px-3">
                  {selectedFood.fields.Demography}
                </p>
              </div>
            </div>
            <div
              className="py-3 pl-[10px] text-[14px] text-justify overflow-y-auto"
              style={{ maxHeight: "450px" }}
            >
              {selectedFood.fields.Description}
            </div>
            <div className="mt-auto flex justify-between items-center py-3">
              <button
                className="text-[#FFF157] font-semibold text-[22px] bg-[#FF0800] py-1 px-5 rounded-3xl"
                onClick={() => window.open(selectedFood.fields.Youtube, "_blank")}
              >
                Learn how to make
              </button>
              {favorites.some((item) => item.ID === selectedFood.id) ? (
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

export default FoodArchive;
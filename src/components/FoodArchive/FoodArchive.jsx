import { useState, useEffect } from "react";
import base from "../../api/base";
import FoodCard from "../../components/FoodCard/FoodCard";
import Filter from "../../components/filter/Filter";

const FoodArchive = ({ searchQuery }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [isSorted, setIsSorted] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await base("Foods").select({ view: "Grid view" }).all();
        setFoods(records);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Toggle sorting when the button is clicked
  const handleSortToggle = () => {
    setIsSorted((prev) => !prev);
  };

  // Filter and conditionally sort the foods
  const filteredFoods = foods
    .filter((food) => {
      const name = food.fields.Name?.toLowerCase() || "";
      const category = food.fields.Category?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return name.includes(query) || category.includes(query);
    })
    .sort((a, b) => {
      if (!isSorted) return 0; // Skip sorting if sorting is not enabled
      const nameA = a.fields.Name?.toLowerCase() || "";
      const nameB = b.fields.Name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    });

  // Group foods by the first letter of their name
  const groupedFoods = filteredFoods.reduce((groups, food) => {
    const name = food.fields.Name?.toLowerCase() || "";
    const firstLetter = name.charAt(0).toUpperCase();

    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(food);

    return groups;
  }, {});

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Filter component with sort button */}
      <Filter onSortToggle={handleSortToggle} isSorted={isSorted} />

      <div className="p-0">
        {isSorted && (
          <>
            {Object.keys(groupedFoods).map((letter) => (
              <div key={letter}>
                {/* Render letter as demarcation */}
                <div className="flex gap-5 lg:gap-10 items-center mt-10">
                  <h2 className="text-[24px] lg:text-[40px] font-bold text-[#777777]">{letter}</h2>
                  <div className="h-[1px] w-full bg-[#777777]"></div>
                </div>

                {/* Render food items under each letter */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
                  {groupedFoods[letter].map((food) => {
                    const { Name, Youtube, Category, Description, Image, Demography } = food.fields;

                    return (
                      <FoodCard
                        key={food.id}
                        name={Name || "No Name Available"}
                        youtube={Youtube || "#"}
                        category={Category || "Uncategorized"}
                        description={Description || "No description provided"}
                        image={Image?.[0]?.url || "/placeholder.jpg"}
                        demography={Demography || "Not specified"}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
        {/* If not sorted, just show the foods as a simple list */}
        {!isSorted && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
            {filteredFoods.map((food) => {
              const { Name, Youtube, Category, Description, Image, Demography } = food.fields;

              return (
                <FoodCard
                  key={food.id}
                  name={Name || "No Name Available"}
                  youtube={Youtube || "#"}
                  category={Category || "Uncategorized"}
                  description={Description || "No description provided"}
                  image={Image?.[0]?.url || "/placeholder.jpg"}
                  demography={Demography || "Not specified"}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodArchive;

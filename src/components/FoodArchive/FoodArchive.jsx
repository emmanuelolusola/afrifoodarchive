import { useState, useEffect } from "react";
import base from "../../api/base";
import FoodCard from "../../components/FoodCard/FoodCard";

const FoodArchive = ({ searchQuery }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

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

  const filteredFoods = foods.filter((food) => {
    const name = food.fields.Name?.toLowerCase() || "";
    const category = food.fields.Category?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return name.includes(query) || category.includes(query);
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-2 md:gap-5">
      {filteredFoods.map((food) => {
        const { Name, Youtube, Category, Description, Image, Demography } =
          food.fields;

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
  );
};

export default FoodArchive;

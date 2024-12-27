import { useState, useEffect } from 'react';
import base from '../../api/base';
import FoodCard from '../../components/FoodCard/FoodCard';

const FoodArchive = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await base('Foods').select({ view: 'Grid view' }).all();
        setFoods(records);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
      {foods.map((food) => {
        const { Name, Youtube, Category, Description, Image, Demography } = food.fields;

        return (
          <FoodCard
            key={food.id} 
            name={Name || 'No Name Available'} 
            youtube={Youtube || '#'} 
            category={Category || 'Uncategorized'}
            description={Description || 'No description provided'}
            image={Image?.[0]?.url || '/placeholder.jpg'} 
            demography={Demography || 'Not specified'}
          />
        );
      })}
    </div>
  );
};

export default FoodArchive;
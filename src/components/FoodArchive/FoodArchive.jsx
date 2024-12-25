import { useState, useEffect } from 'react';
import base from '../../api/base';

const FoodArchive = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    base('Foods')
      .select({ view: 'Grid view' })
      .eachPage(
        (records, fetchNextPage) => {
          setFoods((prevFoods) => [...prevFoods, ...records]);
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error('Error fetching data:', err);
          }
        }
      );
  }, []);

  return (
    <div>
      <h1>Food Archive</h1>
      <ul>
        {foods.map((food) => (
          <li key={food.ID}>
            {food.fields.Name}
            {food.fields.Category}
          </li>
    
        ))}
      </ul>
    </div>
  );
};

export default FoodArchive;
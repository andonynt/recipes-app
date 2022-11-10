import { useState, useEffect } from 'react';

const useFetchEdamam = (ingredientName) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [nutrients, setNutrients] = useState({});

  async function fetchMacros() {
    try {
      const response = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?app_id=${
            import.meta.env.VITE_FOOD_DATABASE_APP_ID
          }&app_key=${
            import.meta.env.VITE_FOOD_DATABASE_APP_KEY
          }&ingr=${ingredientName}&nutrition-type=cooking`
        ),
        info = await response.json();
      // console.log(info);
      setNutrients(info.parsed[0].food.nutrients);
      setIsLoaded(true);
    } catch (error) {
      setNutrients(null);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchMacros();
  }, []);

  return { isLoaded, nutrients };
};

export default useFetchEdamam;

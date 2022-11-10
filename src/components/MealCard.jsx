import React from 'react';
import { Link } from 'react-router-dom';

const MealCard = ({ item }) => {
  const { idMeal, strMeal, strMealThumb } = item;
  return (
    <Link to={`/meal/${idMeal}`} className='space-y-6'>
      {/* Image */}
      <img
        className='mx-auto lg:aspect-[9/16] aspect-video object-cover rounded-tl-xl rounded-br-xl hover:scale-105 duration-300 ease-out'
        src={strMealThumb}
        alt={strMeal}
      />

      {/* Title */}
      <h3 className='text-md md:text-xl text-center font-semibold'>
        {strMeal}
      </h3>
    </Link>
  );
};

export default MealCard;

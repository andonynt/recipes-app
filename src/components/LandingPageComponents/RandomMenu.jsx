import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { getLikedMealsContext } from '../../context/LikedMealsContext';
import useFetch from '../../hooks/useFetch';
import Modal from '../../styledComponents/Modal';
import { Loader } from '../componentsDispatcher';

const RandomMenu = () => {
  // Context
  const { addMeal } = getLikedMealsContext();

  const { items, isLoaded } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/random.php',
    'meals'
  );

  const randomRecipe = items[0];

  if (isLoaded) {
    return (
      <section className='flex flex-col space-y-4 py-10 lg:py-0'>
        {/* Absolute image */}

        <img
          className='object-contain rounded-xl'
          src={randomRecipe.strMealThumb}
          alt={randomRecipe.idMeal}
        />

        {/* Description */}
        <div to='/' className='space-y-4 xl:space-y-6 text-center lg:text-left'>
          <Link
            to={`/meal/${randomRecipe.idMeal}`}
            className='text-3xl md:text-4xl font-bold hover:underline'>
            {randomRecipe.strMeal}
          </Link>
          <div>
            <span className='font-bold md:text-2xl text-xl'>Area:</span>{' '}
            <h3 className='text-2xl inline ml-2'>{randomRecipe.strArea}</h3>
          </div>
          <div>
            <span className='font-bold md:text-2xl text-xl'>Category:</span>{' '}
            <h3 className='text-2xl inline ml-2'>{randomRecipe.strCategory}</h3>
          </div>

          <div className='flex space-x-4 py-4 items-center justify-center lg:justify-start'>
            {/* See extra information */}
            <Link
              to={`/meal/${randomRecipe.idMeal}`}
              className='inline-block w-fit'>
              <p className='capitalize  font-bold text-xl underline'>
                read more
              </p>
            </Link>

            {/* Add to my recipes */}
            <FaHeart
              onClick={() => addMeal(randomRecipe)}
              className='w-6 h-6 cursor-pointer hover:fill-red-600 duration-200 ease-in'
            />
          </div>
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }
};

export default RandomMenu;

import React from 'react';
import { Link } from 'react-router-dom';
import { MdCallMade } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';
import { getLikedMealsContext } from '../context/LikedMealsContext';

const FavMealCard = (props) => {
  const { id, name, img, source, category, youtube, removeBtn } = props;

  // Context
  const { addMeal, deleteMeal, closeModal } = getLikedMealsContext();

  return (
    <article className='bg-jet flex flex-col sm:flex-row sm:justify-between sm:pr-4'>
      <div className='flex flex-col sm:flex-row'>
        {/* Image */}
        <img
          className='max-h-32 aspect-video object-cover'
          src={img}
          alt={name}
        />

        {/* Info */}
        <div className='my-4 sm:my-0 sm:ml-4 flex flex-col items-center sm:items-start sm:justify-center space-y-2'>
          <h3 className='text-xl font-semibold'>{name}</h3>
          {category && <h4>Category: {category}</h4>}
          <p>
            More info:{' '}
            {source ? (
              <a
                className='font-semibold underline'
                href={source}
                target='_blank'>
                source
              </a>
            ) : (
              ''
            )}
            {youtube ? (
              <a
                className='ml-2 font-semibold underline'
                href={youtube}
                target='_blank'>
                youtube
              </a>
            ) : (
              ''
            )}
          </p>
        </div>
      </div>

      {/* Links */}
      <div className='flex justify-center items-center space-x-4'>
        <Link
          to={`/meal/${id}`}
          onClick={closeModal}
          className='inline-block w-fit'>
          <div className='p-3 rounded-full border-black border-2'>
            <MdCallMade className='w-4 h-4' />
          </div>
        </Link>

        {removeBtn ? (
          <div
            onClick={() => deleteMeal(id)}
            className='p-3 rounded-full border-black border-2 cursor-pointer'>
            <AiFillDelete className='w-4 h-4' />
          </div>
        ) : (
          <div
            onClick={() => addMeal(props)}
            className='p-3 rounded-full border-black border-2 cursor-pointer'>
            <FiBookmark className='w-4 h-4' />
          </div>
        )}
      </div>
    </article>
  );
};

export default FavMealCard;

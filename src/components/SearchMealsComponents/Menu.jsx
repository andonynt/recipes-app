import React from 'react';
import { PanelFilter, MealCard } from '../componentsDispatcher';

const Menu = ({ items, endpoint }) => {
  return (
    <section className='center mt-10 mb-20'>
      {/* Filters */}

      <div className='flex justify-between'>
        <h2 className='text-3xl md:text-5xl font-bold'>
          Results for '{endpoint.toLowerCase()}'
        </h2>
        <input type='text' className='' name='' id='' />
      </div>
      <p>{items?.length ? items.length : '0'} meals found</p>

      {items ? (
        <div className='grid grid-column-fit gap-5 mt-12 mb-28'>
          {items.map((meal, index) => {
            // console.log(meal);
            return <MealCard key={index} item={meal} />;
          })}
        </div>
      ) : (
        <p>No info found</p>
      )}
    </section>
  );
};

export default Menu;

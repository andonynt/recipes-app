import React, { useState } from 'react';
import filters from '../../store/filters';
import { PanelFilter, MealCard } from '../componentsDispatcher';

const MenuWithFilters = ({ items, endpoint }) => {
  const { category, area } = filters();

  const [areaFl, setAreaFl] = useState('');
  const [categoryFl, setCategoryFl] = useState('');

  function filterArea(area) {
    // console.log(area);
    setAreaFl(area);
  }

  function filterCategory(category) {
    setCategoryFl(category);
  }

  const filtered = items?.filter((item) => {
    return (
      (item.strArea.toLowerCase().includes(areaFl.toLowerCase()) ||
        areaFl.toLowerCase() === 'all') &&
      (item.strCategory.toLowerCase().includes(categoryFl.toLowerCase()) ||
        categoryFl.toLowerCase() === 'all')
    );
  });

  return (
    <section className='center mt-10 mb-20'>
      {/* Filters */}

      <h2 className='text-3xl md:text-5xl font-bold'>
        Results for '{endpoint.toLowerCase()}'
      </h2>
      <p>{filtered?.length ? filtered.length : '0'} meals found</p>
      <section className='flex lg:flex-row flex-col'>
        <PanelFilter title='area' array={area} onFilter={filterArea} />
        <PanelFilter
          title='category'
          array={category}
          onFilter={filterCategory}
        />
      </section>
      {items ? (
        <div className='grid grid-column-fit gap-5 mt-12 mb-28'>
          {filtered.map((meal, index) => {
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

export default MenuWithFilters;

import React, { useState, useEffect } from 'react';
import getRandomNumber from '../../functions/getRandomNumber';
import { MealCard } from '../componentsDispatcher';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const endpoints = [
  {
    title: 'Chicken Around The World',
    url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=chicken',
    route: '/categories/chicken',
  },
  {
    title: 'Going Vegetarian',
    url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian',
    route: '/categories/vegetarian',
  },
  {
    title: 'The Dessert Club',
    url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert',
    route: '/categories/dessert',
  },
];

const CategoryLists = () => {
  const [categoryIslands, setCategoryIslands] = useState([]);

  async function fetchIlands() {
    // ----------------------------------------------------------

    // const items = [];
    // for await (const { title, url } of endpoints) {
    //   const response = await fetch(url),
    //     resolve = await response.json();
    //   const start = getRandomNumber(0, resolve.meals.length - 3);

    //   setCategoryIslands((prev) => {
    //     // console.log(prev);
    //     return [
    //       ...prev,
    //       {
    //         title: title,
    //         items: resolve.meals.slice(start, start + 3),
    //       },
    //     ];
    //   });
    // }

    // ----------------------------------------------------------

    const items = [];
    for await (const { title, route, url } of endpoints) {
      const response = await fetch(url),
        resolve = await response.json();
      const start = getRandomNumber(0, resolve.meals.length - 3);

      items.push({
        title,
        route,
        items: resolve.meals.slice(start, start + 3),
      });
    }

    setCategoryIslands(items);

    // ----------------------------------------------------------

    // const texts = await Promise.all(
    //   endpoints.map(async (url) => {
    //     const resp = await fetch(url),
    //       resolve = await resp.json();
    //     const start = getRandomNumber(0, resolve.meals.length - 3);
    //     console.log({
    //       items: resolve.meals.slice(start, start + 3),
    //     });
    //   })
    // );
  }

  useEffect(() => {
    fetchIlands();
  }, []);

  return (
    <section className='mt-10 bg-main-color/5 pb-20'>
      {categoryIslands.map((island, index) => {
        const { title, route, items } = island;
        return (
          <div className='center flex flex-col items-center pt-20' key={index}>
            <Link
              to={route}
              className='flex items-center w-fit mx-auto text-3xl md:text-4xl font-bold transition duration-300 border-b-4 border-transparent hover:border-black'>
              {title}
              <BsArrowRight className='ml-4' />
            </Link>
            {/* Loop the items */}
            <div className='mt-6 flex flex-col lg:flex-row max-w-5xl space-x-0 lg:space-x-5 space-y-8 lg:space-y-0'>
              {items.map((item, index) => {
                return <MealCard key={index} item={item} />;
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CategoryLists;

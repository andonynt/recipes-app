import { BiCategory, BiFoodMenu } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';

import React from 'react';

export default [
  {
    page: 'categories',
    icon: <BiCategory />,
    links: [
      {
        label: 'beef',
        url: '/categories/beef',
      },
      {
        label: 'seafood',
        url: '/categories/seafood',
      },
      {
        label: 'pasta',
        url: '/categories/pasta',
      },

      {
        label: 'vegan',
        url: '/categories/vegan',
      },
    ],
  },
  {
    page: 'ingredients',
    icon: <BiFoodMenu />,
    links: [
      { label: 'chicken', url: '/ingredients/chicken' },
      { label: 'salmon', url: '/ingredients/salmon' },
      { label: 'beef', url: '/ingredients/beef' },
      { label: 'pork', url: '/ingredients/pork' },
    ],
  },
  {
    page: 'cousines',
    icon: <GiMeal />,
    links: [
      {
        label: 'american',
        img_url: 'https://www.themealdb.com/images/icons/flags/big/64/us.png',
        url: '/cousines/american',
      },
      {
        label: 'british',
        img_url: 'https://www.themealdb.com/images/icons/flags/big/64/gb.png',
        url: '/cousines/british',
      },
      {
        label: 'canadian',
        img_url: 'https://www.themealdb.com/images/icons/flags/big/64/ca.png',
        url: '/cousines/canadian',
      },
      {
        label: 'chinese',
        img_url: 'https://www.themealdb.com/images/icons/flags/big/64/cn.png',
        url: '/cousines/chinese',
      },
      {
        label: 'mexican',
        img_url: 'https://www.themealdb.com/images/icons/flags/big/64/mx.png',
        url: '/cousines/mexican',
      },
      {
        label: 'spanish',
        img_url: 'https://www.themealdb.com/images/icons/flags/big/64/es.png',
        url: '/cousines/spanish',
      },
    ],
  },
];

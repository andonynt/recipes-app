import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import filters from '../store/filters';
import Modal from '../styledComponents/Modal';
import {
  Loader,
  PanelFilter,
  MealCard,
  Menu,
  MenuWithFilters,
} from '../components/componentsDispatcher';
import useFetch from '../hooks/useFetch';

const SearchMeals = ({ level, type }) => {
  const param = useParams();

  // console.log(param);
  const endpoint = param[level];

  const { items, isLoaded } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/${type}.php?${level[0]}=${endpoint}`,
    'meals'
  );

  if (isLoaded && type === 'search') {
    return <MenuWithFilters items={items} endpoint={endpoint} />;
  }

  if (isLoaded) {
    return <Menu items={items} endpoint={endpoint} />;
  }

  if (!isLoaded) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }
};

export default SearchMeals;

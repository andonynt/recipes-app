import React from 'react';
import { Loader } from '../components/componentsDispatcher';
import useFetch from '../hooks/useFetch';
import Modal from '../styledComponents/Modal';

import { Link } from 'react-router-dom';

const Ingredients = () => {
  const { items, isLoaded } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    'meals'
  );

  function filterIngredients(e) {
    const ingredients = document.querySelectorAll('[data-ingredient]');

    ingredients.forEach((item) => {
      if (
        item
          .getAttribute('data-ingredient')
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        item.classList.add('block');
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
        item.classList.remove('block');
      }
    });
  }

  if (isLoaded) {
    return (
      <section className='center mt-10 md:mt-20 min-h-screen'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl md:text-5xl font-bold'>Ingredients</h1>
          <input
            className='outline-none border-black border-b-2'
            type='text'
            onChange={filterIngredients}
            placeholder='filter'
          />
        </div>

        {/* Categories container */}
        <section className='flex flex-wrap justify-center gap-10 mt-16 mb-28'>
          {items.map((ingredient) => {
            const { idIngredient, strIngredient } = ingredient;
            return (
              <Link
                className='text-sm md:text-lg border-white border-b-2 hover:border-black duration-200'
                key={idIngredient}
                data-ingredient={strIngredient}
                to={`/ingredients/${strIngredient}`}>
                {strIngredient}
              </Link>
            );
          })}
        </section>
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

export default Ingredients;

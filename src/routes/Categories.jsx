import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Modal from '../styledComponents/Modal';
import { Loader } from '../components/componentsDispatcher';

const Categories = () => {
  const { items, isLoaded } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php',
    'categories'
  );

  if (isLoaded) {
    return (
      <section className='center mt-10 md:mt-20'>
        <h1 className='text-3xl md:text-5xl font-bold'>Categories</h1>

        {/* Categories container */}
        <section className='flex flex-wrap justify-center gap-10 mt-16 mb-28'>
          {items.map((category) => {
            const { idCategory, strCategory, strCategoryThumb } = category;
            return (
              <Link
                key={idCategory}
                className='category-link'
                to={`/categories/${strCategory.toLowerCase()}`}>
                <div className='bg-customGray relative p-4 min-w-[300px] max-w-[500px] py-24 flex justify-center items-center'>
                  {/* Image */}
                  <div className='absolute inset-0 flex justify-center items-center'>
                    <img
                      className='category-image brightness-50'
                      src={strCategoryThumb}
                      alt={strCategory}
                    />
                  </div>
                  {/* Tittle */}
                  <div className='category-title relative h-full bg-white py-1 px-4 rounded-md'>
                    <h3 className='text-black text-xl md:text-2xl font-bold tracking-wide select-none'>
                      {strCategory}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <Modal className='bg-black'>
        <Loader />
      </Modal>
    );
  }
};

export default Categories;

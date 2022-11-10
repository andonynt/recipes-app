import React from 'react';
import RandomMenu from './RandomMenu';
import chef from '../../assets/images/cooking-image.png';
import { Link } from 'react-router-dom';
import kitchenTips from '../../assets/tips/kitchenTips';

const StickyMenu = () => {
  return (
    <section className='center px-0 grid lg:grid-cols-2 gap-5 mt-10 lg:mt-0'>
      {/* Random menu */}
      <article className='lg:h-screen lg:px-6 lg:sticky lg:top-0 flex justify-center items-center'>
        <RandomMenu />
      </article>

      {/* Extra info, meals */}
      <article>
        {/* Find over +280 meals in +12 categories */}
        <div className='select-none h-screen bg-black flex flex-col justify-center items-center text-white py-10 lg:px-4 homepage-cooking relative overflow-hidden z-0 pb-8'>
          <div className='z-10'>
            {/* Image */}
            <img className='w-full' src={chef} alt='chef' />
            {/* Info */}
            <div className='text-2xl text-center'>
              <p>Find over</p>
              <p>
                <span className='lg:text-8xl text-7xl font-semibold'>+280</span>{' '}
                meals
              </p>
              <p>
                <span className='lg:text-8xl text-7xl font-semibold'>+12</span>{' '}
                categories
              </p>
            </div>
          </div>
        </div>

        {/* Kitchen tips */}
        {kitchenTips.map((tip, index) => {
          const { title, img_url, url } = tip;
          return (
            <div
              key={index}
              className='min-h-[50vh] py-4 flex flex-col justify-center items-center space-y-6'>
              <img
                className='w-full max-h-max object-cover rounded-lg'
                src={img_url}
                alt=''
              />
              <span className='capitalize py-2 px-4 font-semibold bg-main-color rounded-xl select-none'>
                kitchen tips
              </span>
              <Link
                to={url}
                className='text-3xl hover:underline text-center px-2 lg:px-0'>
                {title}
              </Link>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default StickyMenu;

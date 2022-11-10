import React, { useEffect, useState } from 'react';
import { getMenuContext } from '../../context/DropdownMenuContext';
import heroSearchIcons from '../../assets/heroSearchIcons';
import { Link, useNavigate } from 'react-router-dom';
import getRandomNumber from '../../functions/getRandomNumber';

const bgImages = [
  'https://cdn.wallpapersafari.com/26/92/0KH5pV.jpg',
  'https://image.pbs.org/video-assets/17Ft3kH-asset-mezzanine-16x9-D7UsuOr.jpg',
  'https://cdn.wallpapersafari.com/0/76/CZP2KI.png',
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { closeSubmenu, searchRef } = getMenuContext();

  const [randomIndex, setRandomIndex] = useState(null);

  const heroStyles = {
    backgroundImage: `url('${bgImages[randomIndex]}')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    // TODO: Get random index for Hero Background
    const rIndex = getRandomNumber(0, bgImages.length - 1);
    setRandomIndex(rIndex);
  }, []);

  function handleSearchMeal(e) {
    if (e.keyCode === 13 && searchRef.current.value !== '') {
      navigate(`/meals/${searchRef.current.value.toLowerCase()}`);
    }
  }

  return (
    <main
      onMouseOver={closeSubmenu}
      style={heroStyles}
      className='w-full h-hero flex justify-center items-center'>
      {/* Search bar */}
      <div className='max-w-2xl bg-black text-white lg:py-8 lg:px-16 px-8 py-6 lg:rounded-xl'>
        <p className='lg:text-6xl md:text-5xl text-3xl capitalize font-bold'>
          find the perfect recipe
        </p>
        <input
          ref={searchRef}
          onKeyDown={handleSearchMeal}
          type='text'
          className='w-full mt-6 outline-none bg-black text-white border-b-2 border-white focus:border-gray-500 duration-200 text-xl'
          placeholder='Search by meal name'
        />
        <div className='mt-10 flex flex-wrap gap-5 justify-between capitalize'>
          {heroSearchIcons.map((item, index) => {
            const { name, icon, url } = item;
            return (
              <Link
                key={index}
                to={url}
                className='flex-grow flex flex-col items-center hover:text-main-color duration-200 ease-out'>
                {/* Icon */}
                {icon}
                {/* Name */}
                <p className='md:text-lg text-base'>{name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;

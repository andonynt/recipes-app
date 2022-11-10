import React, { useRef } from 'react';
import logo from '../assets/images/food-logo.webp';
import { getMenuContext } from '../context/DropdownMenuContext';
import { getLikedMealsContext } from '../context/LikedMealsContext';
import { FaSearch, FaHeart } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const NavBar = () => {
  const menuRef = useRef();

  const { openSideBar, openSubmenu, closeSubmenu, handleSearchBtn } =
    getMenuContext();
  const { openModal } = getLikedMealsContext();

  const displaySubMenu = (e) => {
    const page = e.target.textContent.toLowerCase();
    const tempBtn = e.target.getBoundingClientRect();
    // console.log(tempBtn);
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom;
    openSubmenu(page, { center, bottom });
  };

  function handleSubmenu(e) {
    if (!e.target.matches('.submenu *')) {
      closeSubmenu();
    }
  }

  return (
    <>
      <nav
        onMouseOver={handleSubmenu}
        className='w-full bg-white flex justify-between items-center h-24 py-4 px-4'>
        {/* Logo */}

        <Link className='h-full flex items-center' to='/'>
          <img className='h-full' src={logo} alt='grub-hub-logo' />
        </Link>

        <div
          onClick={openSideBar}
          className='flex flex-col justify-center space-y-1 lg:hidden'>
          <div className='h-[2px] w-4 bg-black'></div>
          <div className='h-[2px] w-4 bg-black'></div>
          <div className='h-[2px] w-4 bg-black'></div>
        </div>

        <div
          ref={menuRef}
          className='submenu h-full lg:flex items-center space-x-12 hidden'>
          {/* Menu */}
          <Link
            to='/categories'
            className='h-full flex items-center capitalize font-semibold'
            onMouseOver={displaySubMenu}>
            categories
          </Link>

          <Link
            to='/ingredients'
            className='h-full flex items-center capitalize font-semibold'
            onMouseOver={displaySubMenu}>
            ingredients
          </Link>

          <Link
            to='/cousines'
            className='h-full flex items-center capitalize font-semibold'
            onMouseOver={displaySubMenu}>
            cousines
          </Link>
        </div>

        {/* Search and liked */}
        <div className='hidden lg:flex space-x-4'>
          <FaSearch
            onClick={handleSearchBtn}
            className='w-7 h-7 cursor-pointer'
          />
          <FaHeart
            onClick={openModal}
            className='w-7 h-7 cursor-pointer hover:fill-red-600 duration-200 ease-in'
          />
        </div>

        {/* Like absolute btn */}
        <div className='fixed z-30 right-5 bottom-5 p-4 bg-white rounded-full lg:hidden'>
          <FaHeart onClick={openModal} className='fill-red-600 w-7 h-7' />
        </div>
      </nav>
    </>
  );
};

export default NavBar;

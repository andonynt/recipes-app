import React from 'react';
import logo from '../assets/images/food-logo.webp';
import {
  BsInstagram,
  BsPinterest,
  BsFacebook,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const socialIcons = [
  {
    icon: (
      <BsInstagram className='sm:w-10 sm:h-10 w-6 h-6 hover:fill-main-color duration-200 ease-out' />
    ),
    url: '/',
  },
  {
    icon: (
      <BsPinterest className='sm:w-10 sm:h-10 w-6 h-6 hover:fill-main-color duration-200 ease-out' />
    ),
    url: '/',
  },
  {
    icon: (
      <BsFacebook className='sm:w-10 sm:h-10 w-6 h-6 hover:fill-main-color duration-200 ease-out' />
    ),
    url: '/',
  },
  {
    icon: (
      <BsTwitter className='sm:w-10 sm:h-10 w-6 h-6 hover:fill-main-color duration-200 ease-out' />
    ),
    url: '/',
  },
  {
    icon: (
      <BsYoutube className='sm:w-10 sm:h-10 w-6 h-6 hover:fill-main-color duration-200 ease-out' />
    ),
    url: '/',
  },
];

const navigation = [
  {
    subtitle: 'home',
    url: '/',
  },
  {
    subtitle: 'search',
    url: '/',
  },
  {
    subtitle: 'categories',
    url: '/',
  },
  {
    subtitle: 'cousines',
    url: '/',
  },
];

const Footer = () => {
  return (
    <footer className='bg-black'>
      <div className='center py-20 text-white'>
        <div className='flex flex-col lg:flex-row'>
          {/* Right */}
          <div className='w-full flex flex-col items-center lg:items-start lg:w-1/2 space-y-4'>
            <img
              className='w-20 h-20 rounded-full'
              src={logo}
              alt='footer-logo'
            />
            <h3 className='font-bold text-2xl'>Ready to cook?</h3>
            <p>Recipes you want to make. Cooking advice that works.</p>
            <p className='capitalize text-2xl font-bold text-center lg:text-left'>
              let's be friends
            </p>
            <ul className='flex space-x-4 justify-center lg:justify-start'>
              {/* Social icons Loop */}
              {socialIcons.map((socialIcon, index) => {
                const { icon, url } = socialIcon;
                return (
                  <li key={index}>
                    <Link to={url}>{icon}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Left */}
          <ul className='w-full lg:w-1/2 flex flex-col lg:flex-row justify-center items-center lg:justify-between space-y-4 lg:space-y-0 my-8 lg:my-0'>
            {/* Navigation wrapper loop */}
            {navigation.map((item, index) => {
              const { subtitle, url } = item;
              return (
                <li key={index}>
                  <Link to={url} className='capitalize'>
                    {subtitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Line */}
        <div className='h-[2px] bg-white my-6'></div>

        <p className='text-sm text-center'>
          © {new Date().getFullYear()}. All rights reserved. Use of this site
          constitutes acceptance of our User Agreement and Privacy Policy.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

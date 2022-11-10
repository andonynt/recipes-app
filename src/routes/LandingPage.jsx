import React from 'react';
import {
  Hero,
  StickyMenu,
  CategoryLists,
} from '../components/componentsDispatcher';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <StickyMenu />
      <CategoryLists />
    </>
  );
};

export default LandingPage;

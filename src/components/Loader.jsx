import React from 'react';
import '../styles/loaderStyles.css';

const Loader = () => {
  return (
    <div className='lds-roller'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;

import React from 'react';

const SideModal = ({ message }) => {
  return (
    <div
      id='sidemodal'
      className='absolute top-4 right-0 px-5 py-3 bg-red-400 opacity-0 invisible font-semibold duration-300 text-sm md:text-base'>
      {message}
    </div>
  );
};

export default SideModal;

import React from 'react';
import useFetchEdamam from '../hooks/useFetchEdamam';
import Modal from '../styledComponents/Modal';
import { Loader } from './componentsDispatcher';

const MACROS = {
  ENERC_KCAL: ['calories', 'Kcal'],
  PROCNT: ['protein', 'gr'],
  FAT: ['fat', 'gr'],
  CHOCDF: ['carbohydrate', 'gr'],
  FIBTG: ['fiber', 'gr'],
};

const NutritionFacts = ({ onShowModal, ingredientName }) => {
  const { nutrients, isLoaded } = useFetchEdamam(ingredientName);

  if (isLoaded && nutrients) {
    return (
      <Modal className='flex flex-col'>
        {/* Nutrition facts */}
        <div className='bg-white text-black p-4'>
          <div className='border-black border-2 p-4 capitalize'>
            {/* Title */}
            <h2 className='font-bold text-3xl md:text-5xl'>nutrition facts</h2>
            <h3 className='font-semibold py-1'>
              Amount per Serving ({ingredientName})
            </h3>
            <div className='bg-black h-1'></div> {/* Line */}
            {/* Size */}
            <div className='flex justify-between py-2'>
              <p>Per</p>
              <p>100gr</p>
            </div>
            {/* Information */}
            <div className='space-y-2 pb-2'>
              {/* Nutrients */}
              <div className='bg-black h-[2px]'></div> {/* Line */}
              {Object.keys(nutrients).map((key, index) => {
                return (
                  <div key={index} className='flex justify-between'>
                    <p className='font-bold'>{MACROS[key][0]}</p>
                    <p>
                      {nutrients[key]}
                      {MACROS[key][1]}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className='bg-black h-1'></div> {/* Line */}
          </div>
        </div>

        <button
          onClick={onShowModal}
          className='mt-4 rounded-xl px-5 py-3 capitalize bg-main-color text-black font-semibold'>
          close
        </button>
      </Modal>
    );
  }

  if (isLoaded && !nutrients) {
    return (
      <Modal className='flex flex-col'>
        <div className='bg-white text-black p-4 border-black border-2'>
          <h3 className='text-2xl font-semibold'>
            Sorry, Information not available :(
          </h3>
        </div>

        <button
          onClick={onShowModal}
          className='mt-4 rounded-xl px-5 py-3 capitalize bg-main-color text-black font-semibold'>
          close
        </button>
      </Modal>
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

export default NutritionFacts;

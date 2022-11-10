import React from 'react';
import useFetch from '../hooks/useFetch';

import Modal from '../styledComponents/Modal';
import { Loader } from '../components/componentsDispatcher';
import { Link } from 'react-router-dom';

const flags = {
  American: 'https://www.themealdb.com/images/icons/flags/big/64/us.png',
  British: 'https://www.themealdb.com/images/icons/flags/big/64/gb.png',
  Canadian: 'https://www.themealdb.com/images/icons/flags/big/64/ca.png',
  Chinese: 'https://www.themealdb.com/images/icons/flags/big/64/cn.png',
  Croatian: 'https://www.themealdb.com/images/icons/flags/big/64/hr.png',
  Dutch: 'https://www.themealdb.com/images/icons/flags/big/64/nl.png',
  Egyptian: 'https://www.themealdb.com/images/icons/flags/big/64/eg.png',
  French: 'https://www.themealdb.com/images/icons/flags/big/64/fr.png',
  Greek: 'https://www.themealdb.com/images/icons/flags/big/64/gr.png',
  Indian: 'https://www.themealdb.com/images/icons/flags/big/64/in.png',
  Irish: 'https://www.themealdb.com/images/icons/flags/big/64/ie.png',
  Italian: 'https://www.themealdb.com/images/icons/flags/big/64/it.png',
  Jamaican: 'https://www.themealdb.com/images/icons/flags/big/64/jm.png',
  Japanese: 'https://www.themealdb.com/images/icons/flags/big/64/jp.png',
  Kenyan: 'https://www.themealdb.com/images/icons/flags/big/64/kn.png',
  Malaysian: 'https://www.themealdb.com/images/icons/flags/big/64/my.png',
  Mexican: 'https://www.themealdb.com/images/icons/flags/big/64/mx.png',
  Moroccan: 'https://www.themealdb.com/images/icons/flags/big/64/ma.png',
  Polish: 'https://www.themealdb.com/images/icons/flags/big/64/pl.png',
  Portuguese: 'https://www.themealdb.com/images/icons/flags/big/64/pt.png',
  Russian: 'https://www.themealdb.com/images/icons/flags/big/64/ru.png',
  Spanish: 'https://www.themealdb.com/images/icons/flags/big/64/es.png',
  Thai: 'https://www.themealdb.com/images/icons/flags/big/64/th.png',
  Tunisian: 'https://www.themealdb.com/images/icons/flags/big/64/tn.png',
  Turkish: 'https://www.themealdb.com/images/icons/flags/big/64/tr.png',
  Unknown:
    'https://i.pinimg.com/1200x/bb/9a/ed/bb9aed9606c71a3a208f9d99de3d17bb.jpg',
  Vietnamese: 'https://www.themealdb.com/images/icons/flags/big/64/vn.png',
};

const Cousines = () => {
  const { items, isLoaded } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
    'meals'
  );

  // console.log(items);

  if (isLoaded) {
    return (
      <section className='center mt-10 md:mt-20'>
        <h1 className='text-3xl md:text-5xl font-bold'>Cousines</h1>

        <section className='flex flex-wrap justify-center gap-10 mt-16 mb-28'>
          {items.map((area, index) => {
            const { strArea } = area;
            return (
              <Link key={index} to={`/cousines/${strArea}`}>
                <div>
                  <div className='flex justify-center items-center'>
                    <img
                      className='w-16 h-16'
                      src={flags[strArea]}
                      alt={strArea}
                    />
                  </div>
                  <p>{strArea}</p>
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
      <Modal>
        <Loader />
      </Modal>
    );
  }
};

export default Cousines;

import React, { useState, useEffect, useRef } from 'react';
import { getMenuContext } from '../../context/DropdownMenuContext';
import { Link } from 'react-router-dom';

const SubMenu = () => {
  const { isSubmenuOpen, location, page } = getMenuContext();

  const [columns, setColumns] = useState('grid-cols-2');

  const container = useRef();

  useEffect(() => {
    setColumns('col-2');
    const subMenu = container.current;
    const { center, bottom } = location;
    subMenu.style.left = `${center}px`;
    subMenu.style.top = `${bottom}px`;

    if (page.links.length === 3) setColumns('grid-cols-3');

    if (page.links.length > 3) setColumns('grid-cols-4');
  }, [location]);

  return (
    <aside
      ref={container}
      className={` bg-white border-black border-2 min-w-max absolute -translate-x-2/4	transition-all duration-300 py-8 px-12 z-10 rounded-xl ${
        isSubmenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
      <div className='flex justify-between items-center mb-6'>
        <h4 className='capitalize text-2xl font-bold'>{page.page}</h4>
        <Link to={`/${page.page}`}>View all</Link>
      </div>
      <div className={`grid gap-5 ${columns}`}>
        {/* Loop label */}
        {page.links.map((link, index) => {
          const { label, url, img_url } = link;

          const imgCondition = {
            categories: `https://www.themealdb.com/images/category/${label.toLowerCase()}.png`,
            ingredients: `https://www.themealdb.com/images/ingredients/${label.toLowerCase()}.png`,
            cousines: img_url,
          };

          return (
            <Link
              to={url}
              className='flex justify-center items-center capitalize text-md'
              key={index}>
              <div className='flex flex-col items-center'>
                <img
                  className={`${page.page === 'cousines' ? '' : 'w-36'}`}
                  src={imgCondition[page.page]}
                  alt={label}
                />

                <p className='mt-2 font-medium'>{label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default SubMenu;

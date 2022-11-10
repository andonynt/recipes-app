import React, { useState } from 'react';

const PanelFilter = ({ title, array, onFilter }) => {
  // console.log(array);
  const [viewAll, setViewAll] = useState(false);

  function handleClick() {
    setViewAll(!viewAll);
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleFilter(e, prop) {
    boldElement(e.target);
    onFilter(prop);
    setViewAll(false);
  }

  function boldElement(element) {
    const $prevElement = document.querySelector(`.${title}.filterBold`);
    if ($prevElement) $prevElement.classList.remove('filterBold');
    element.classList.add('filterBold');
  }

  return (
    <section className='lg:w-1/2 w-full mt-3 space-y-1'>
      <h3 className='text-2xl font-semibold'>Filter by '{title}'</h3>
      {array.map((item, index) => {
        const prop = `str${capitalize(title)}`;
        return (
          <button
            key={index}
            data-type={title}
            onClick={(e) => handleFilter(e, item[prop])}
            className={`pl-4 ${title} text-lg ${
              index > 2 && !viewAll ? 'hidden' : 'block'
            }`}>
            {item[prop]}
          </button>
        );
      })}

      <button onClick={handleClick} className='text-main-color font-bold'>
        {viewAll ? 'view less -' : 'view all +'}
      </button>
    </section>
  );
};

export default PanelFilter;

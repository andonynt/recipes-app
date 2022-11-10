import React from 'react';
import menuItems from '../../assets/menuItems';
import { FaTimes } from 'react-icons/fa';
import { getMenuContext } from '../../context/DropdownMenuContext';
import { Link } from 'react-router-dom';
import Modal from '../../styledComponents/Modal';

const Sidebar = () => {
  const { isSideBarOpen, closeSideBar } = getMenuContext();
  return (
    <Modal
      className={`lg:hidden${
        isSideBarOpen ? ' opacity-100 visible' : ' opacity-0 invisible'
      }`}>
      <div className='bg-white w-11/12 mx-auto my-auto flex p-8 rounded-xl'>
        {/* Print links - Double Loop*/}
        <div className='flex-grow space-y-8'>
          {menuItems.map((item, index) => {
            const { links, page, icon } = item;
            return (
              <article className='capitalize' key={index}>
                <Link to={`/${page}`}>
                  <div
                    onClick={closeSideBar}
                    className='font-semibold text-2xl flex items-center space-x-2'>
                    <span>{icon}</span>
                    <p>{page}</p>
                  </div>
                </Link>
                <div className='mt-2 capitalize grid sm:grid-cols-2 gap-3 sm:text-lg text-md'>
                  {links.map((link, index) => {
                    const { url, icon, label } = link;
                    return (
                      <Link
                        onClick={closeSideBar}
                        to={url}
                        className='flex items-center w-fit'
                        key={index}>
                        {icon}
                        <p className='ml-2'>{label}</p>
                      </Link>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        {/* Close sidebar button */}
        <button onClick={closeSideBar} className='self-start'>
          <FaTimes />
        </button>
      </div>
    </Modal>
  );
};

export default Sidebar;

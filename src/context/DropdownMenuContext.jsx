import React, { useState, createContext, useContext, useRef } from 'react';
import menuItems from '../assets/menuItems';

const DropdownMenuContext = createContext();

function getMenuContext() {
  return useContext(DropdownMenuContext);
}

const DropdownMenuContextProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState({ page: '', links: [] });

  // Search Button ref
  const searchRef = useRef();

  const openSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  const openSubmenu = (textPage, coords) => {
    const correctPage = menuItems.find((item) => item.page === textPage);
    setPage(correctPage);
    setLocation(coords);
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  // TODO: Handle search Btn
  function handleSearchBtn() {
    searchRef.current.focus();
  }

  return (
    <DropdownMenuContext.Provider
      value={{
        isSideBarOpen,
        isSubmenuOpen,
        openSideBar,
        closeSideBar,
        openSubmenu,
        closeSubmenu,
        location,
        page,
        searchRef,
        handleSearchBtn,
      }}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

export { DropdownMenuContextProvider, getMenuContext };

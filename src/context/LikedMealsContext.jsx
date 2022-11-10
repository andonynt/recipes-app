import React, { useState, createContext, useContext } from 'react';
import { updateUser } from '../firebase/index';

const LikedMealsContext = createContext();

function getLikedMealsContext() {
  return useContext(LikedMealsContext);
}

const LikedMealsContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // TODO: Add meal
  function addMeal(meal) {
    // console.log(userInfo);
    // console.log(meal);

    if (!userInfo.name) {
      // console.log('You are not logged in');
      openModal();
      return;
    }

    const exists = userInfo.likedMeals.find((m) => m.id === meal.idMeal);
    if (exists) {
      alert('Meal is already in your list.');
      return;
    }

    if (userInfo.name) {
      const tmpMeal = {
        id: meal.idMeal,
        name: meal.strMeal,
        area: meal.strArea,
        category: meal.strCategory,
        tags: meal.strTags,
        youtube: meal.strYoutube,
        source: meal.strSource,
        img: meal.strMealThumb,
      };

      const temp = {
        ...userInfo,
        likedMeals: [...userInfo.likedMeals, tmpMeal],
      };

      setUserInfo(temp);
      updateUser(temp.uid, temp);

      return;
    }
  }

  // TODO: Delete meal
  function deleteMeal(id) {
    // console.log('Deleted');
    const newArray = userInfo.likedMeals.filter((m) => m.id !== id);
    const temp = {
      ...userInfo,
      likedMeals: newArray,
    };
    setUserInfo(temp);
    updateUser(temp.uid, temp);

    return;
  }

  // TODO: Open and Close Modal
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <LikedMealsContext.Provider
      value={{
        isModalOpen,
        userInfo,
        setUserInfo,
        openModal,
        closeModal,
        addMeal,
        deleteMeal,
      }}>
      {children}
    </LikedMealsContext.Provider>
  );
};

export { LikedMealsContextProvider, getLikedMealsContext };

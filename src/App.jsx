import React, { useState } from 'react';
import './styles/main.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Modal from './styledComponents/Modal';
import filters from './store/filters';
// Routes
import {
  LandingPage,
  Categories,
  NotFound,
  CreateUser,
  Ingredients,
  Cousines,
  SearchMeals,
  MealsByName,
  MealsByCousine,
  Meal,
} from './routes/routesDispatcher';

// Components
import {
  NavBar,
  SideBar,
  SubMenu,
  LikedMealsModal,
  AuthProvider,
  Loader,
} from './components/componentsDispatcher';

import { getLikedMealsContext } from './context/LikedMealsContext';

import { getUserInfo } from './firebase/index';
import { useEffect } from 'react';

const promises = [
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setProp } = filters();
  const { setUserInfo } = getLikedMealsContext();

  async function fetchCategoriesAndAreas() {
    try {
      const result = await Promise.all(promises),
        categoriesResolve = await result[0].json(),
        areasResolve = await result[1].json();
      setProp('category', categoriesResolve.meals);
      setProp('area', areasResolve.meals);
    } catch (error) {
      console.log(error);
    }
  }

  /* Auth provider functions */
  async function handleLoggedIn(uid) {
    const tempUserInfo = await getUserInfo(uid);
    // console.log('Logged correctly.');
    setUserInfo(tempUserInfo);
    setIsLoading(false);
  }

  async function handleNotLoggedIn() {
    // console.log('Not logged');
    setIsLoading(false);
  }
  useEffect(() => {
    fetchCategoriesAndAreas();
  }, []);

  if (!isLoading) {
    return (
      <>
        <NavBar />
        <SideBar />
        <SubMenu />
        <LikedMealsModal />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route
            path='/meals/:search'
            element={<SearchMeals level='search' type='search' />}
          />
          <Route path='/meal/:id' element={<Meal />} />
          <Route path='/categories' element={<Categories />} />
          <Route
            path='/categories/:category'
            element={<SearchMeals level='category' type='filter' />}
          />
          <Route path='/ingredients' element={<Ingredients />} />
          <Route
            path='/ingredients/:ingredient'
            element={<SearchMeals level='ingredient' type='filter' />}
          />
          <Route path='/cousines' element={<Cousines />} />
          <Route
            path='/cousines/:area'
            element={<SearchMeals level='area' type='filter' />}
          />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <AuthProvider
        onUserLoggedIn={handleLoggedIn}
        onUserNotLoggedIn={handleNotLoggedIn}>
        <Modal className='bg-black'>
          <Loader />
        </Modal>
      </AuthProvider>
    );
  }
};

export default App;

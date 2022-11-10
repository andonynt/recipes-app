import React, { useRef, useState } from 'react';
import { getLikedMealsContext } from '../context/LikedMealsContext';
import { FaTimes } from 'react-icons/fa';
import Modal from '../styledComponents/Modal';
import { AuthProvider, Loader, CustomMealCard } from './componentsDispatcher';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

// Firebase
import { auth, registerUser, uidExists, getUserInfo } from '../firebase/index';
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const LikedMealsModal = () => {
  const { isModalOpen, closeModal, setUserInfo, userInfo } =
    getLikedMealsContext();

  const [userState, setUserState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const filtered = userInfo.likedMeals?.filter((meal) => {
    return meal.name.toLowerCase().includes(query.toLowerCase());
  });

  function handleChangeQuery(e) {
    const value = e.target.value;
    setQuery(value);
  }

  // Login Form Refs
  const emailRef = useRef(),
    passwordRef = useRef();

  function logOut() {
    setIsLoading(true);
    signOut(auth);
    navigate('/');
    setUserInfo({
      name: '',
      likedMeals: [],
    });
    setIsLoading(false);
  }

  /*
    0: Initial State
    1: OK
    2: Not logged
  */

  async function showUserInfo(uid) {
    const tempUserInfo = await getUserInfo(uid);
    // console.log('Logged correctly.');
    setUserInfo(tempUserInfo);
    setIsLoading(false);
    setUserState(1);
    setUserState(1);
  }

  function handleLogInForm() {
    setUserState(2);
  }

  // TODO: Check LogIn
  async function handleLogIn(e) {
    e.preventDefault();
    setIsLoading(true);
    // console.log('Login');
    try {
      const email = emailRef.current.value,
        password = passwordRef.current.value;
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(credentials);
      showUserInfo(credentials.user.uid);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Login with Google
  function handleLoginWithGoogle() {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithGoogle(googleProvider);
  }

  async function signInWithGoogle(googleProvider) {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      // console.log(response.user.uid);
      const exists = await uidExists(response.user.uid);
      if (exists) {
        showUserInfo(response.user.uid);
        return;
      }

      // TODO: Register new user
      const user = {
        uid: response.user.uid,
        name: response.user.displayName,
        email: response.user.email,
        likedMeals: [],
        provider: 'GooglePopup',
      };
      setUserInfo(user);
      registerUser(user);
      setIsLoading(false);
      setUserState(1);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  // TODO: Redirect to Create account
  function handleRegisterWithEmail() {
    navigate('/create-user');
    closeModal();
  }

  if (userState === 1 && !isLoading) {
    return (
      <Modal
        className={`${
          isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        <div className='bg-white md:rounded-xl py-6 px-4 md:px-10 space-y-6 w-full md:max-w-4xl'>
          <div className='flex justify-between'>
            {/* Welcome */}
            <h2 className='flex justify-center items-center text-2xl md:text-3xl capitalize'>
              Hello, {userInfo.name.split(' ', 1).join('')}.
            </h2>
            {/* Exit btn */}
            <FaTimes onClick={closeModal} className='w-8 h-8 cursor-pointer' />
          </div>

          {/* Filter */}
          <input
            type='text'
            value={query}
            onChange={handleChangeQuery}
            placeholder='Filter by name..'
          />

          {/* Favorite meals */}
          {filtered.length === 0 ? (
            <h3 className='font-xl font-semibold text-center'>
              Your list is empty.
            </h3>
          ) : (
            <section className='space-y-4 max-h-[600px] overflow-y-scroll'>
              {filtered.map((meal, index) => {
                // console.log(meal);
                return (
                  <CustomMealCard key={index} {...meal} removeBtn={true} />
                );
              })}
            </section>
          )}

          {/* Sign Out btn */}
          <button
            onClick={logOut}
            className='capitalize flex mx-auto bg-main-color/75 py-2 px-5 rounded-2xl'>
            Sign Out
          </button>
        </div>
      </Modal>
    );
  }

  if (userState === 2 && !isLoading) {
    return (
      <Modal
        className={`${
          isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } `}>
        <div className='bg-white mx-auto my-auto p-8 rounded-xl'>
          <div className='flex justify-between'>
            <h2 className='text-4xl lg:text-5xl select-none font-FastHand'>
              Welcome!
            </h2>
            {/* Exit btn */}
            <FaTimes onClick={closeModal} className='w-8 h-8 cursor-pointer' />
          </div>

          <form onSubmit={handleLogIn} className='flex flex-col items-center'>
            {/* Email */}
            <label htmlFor='loginFormEmail'>
              <h3 className='mt-4'>Email</h3>
              <input
                className='outline-none border-b-2 border-black w-full focus:border-gray-500 duration-300'
                type='text'
                id='loginFormEmail'
                autoComplete='off'
                ref={emailRef}
                placeholder='test@test.com'
              />
            </label>

            {/* Password */}
            <label htmlFor='loginFormPassword'>
              <h3 className='mt-4'>Password</h3>
              <input
                className='outline-none border-b-2 border-black w-full focus:border-gray-500 duration-300'
                type='password'
                id='loginFormPassword'
                autoComplete='off'
                ref={passwordRef}
                placeholder='test123'
              />
            </label>
            <input
              className='py-2 px-4 bg-main-color border-[2px] hover:border-black border-main-color duration-300 rounded-xl mt-4 cursor-pointer font-bold'
              type='submit'
              value='LOGIN'
            />
          </form>

          {/* Login with google */}
          <div className='mt-4 space-y-2 lg:block hidden'>
            <h3 className='text-center'>or login with</h3>
            <button
              onClick={handleLoginWithGoogle}
              className='capitalize flex items-center mx-auto border-black border-2 py-1 px-3 rounded-xl hover:bg-gray-200 duration-300'>
              <FcGoogle /> <span className='ml-2'>google</span>
            </button>
          </div>
          {/* Sign up */}
          <div className='text-center mt-4'>
            <span>Not a member?</span>
            <button
              onClick={handleRegisterWithEmail}
              className='capitalize underline rounded-2xl text-blue-900 ml-1 font-semibold'>
              signup now
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  if (isModalOpen && !isLoading) {
    return (
      <AuthProvider
        onUserLoggedIn={showUserInfo}
        onUserNotLoggedIn={handleLogInForm}>
        <Modal>
          <Loader />
        </Modal>
      </AuthProvider>
    );
  }

  // Loader
  if (isLoading) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }
};

export default LikedMealsModal;

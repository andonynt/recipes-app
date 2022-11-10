import React, { useState, useRef } from 'react';
import { AuthProvider, SideModal } from '../components/componentsDispatcher';
import { useNavigate } from 'react-router-dom';

import { getLikedMealsContext } from '../context/LikedMealsContext';

// Auth firebase
import { auth, checkEmailAvailable, registerUser } from '../firebase/index';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateUser = () => {
  const navigate = useNavigate();

  const { setUserInfo, openModal } = getLikedMealsContext();
  const [modalMessage, setModalMessage] = useState('');

  // Create user Form Refs
  const nameRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    confirmPaswordRef = useRef();

  /*
    0: Initial State
    1: OK
    2: Empty form
    3: Password must be at least 6 chars
    4: Confirm password dont match
    5: Email is not available
    */
  const [userState, setUserState] = useState(0);

  function handleLoggedIn() {
    navigate('/');
  }

  function handleCreateUserForm() {
    setUserState(1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const name = nameRef.current.value,
      email = emailRef.current.value,
      password = passwordRef.current.value,
      confirmPassword = confirmPaswordRef.current.value;

    // Inspect form inputs
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      // console.log('There is an empty input.');
      showModal();
      setModalMessage('There is an empty input.');
      return;
    }

    if (password.length < 6) {
      // console.log('Password must have at least 6 characters.');
      showModal();
      setModalMessage('Password must have at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      // console.log('Passwords dont match.');
      showModal();
      setModalMessage(`Passwords don't match`);
      return;
    }

    // console.log('Form is OK');

    // Check
    const exists = await checkEmailAvailable(email);
    if (exists.length > 0) {
      // console.log('Email already exists');
      showModal();
      setModalMessage('An account already exists.');
      return;
    }

    // console.log('Registering...');

    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(credentials);
    const temp = {
      uid: credentials.user.uid,
      name,
      email: credentials.user.email,
      password,
      likedMeals: [],
      provider: 'Email',
    };

    // console.log(temp);
    setUserInfo(temp);
    registerUser(temp);
    handleLoggedIn();
  }

  function showModal() {
    const $sideModal = document.getElementById('sidemodal');
    $sideModal.classList.remove('right-0');
    $sideModal.classList.remove('opacity-0');
    $sideModal.classList.remove('invisible');
    $sideModal.classList.add('right-6');

    setTimeout(() => {
      $sideModal.classList.add('right-0');
      $sideModal.classList.add('opacity-0');
      $sideModal.classList.add('invisible');
      $sideModal.classList.remove('right-6');
    }, 1500);
  }

  if (userState === 1) {
    return (
      <>
        <SideModal message={modalMessage} />
        <div className='max-w-sm mx-auto flex flex-col items-center mt-20 mb-28'>
          <h1 className='text-4xl lg:text-5xl font-bold text-main-color'>
            Sign up
          </h1>
          <p className='mt-8'>Please fill in this form to create an account.</p>
          <form
            onSubmit={handleSubmit}
            className='mt-6 flex flex-col space-y-7'>
            {/* Name */}
            <label htmlFor='createUserFormName'>
              <h3>Write your name</h3>
              <input
                className='outline-none border-b-2 border-black'
                type='text'
                id='createUserFormName'
                autoComplete='off'
                ref={nameRef}
              />
            </label>

            {/* Email */}
            <label htmlFor='createUserFormEmail'>
              <h3>Write your email</h3>
              <input
                className='outline-none border-b-2 border-black'
                type='text'
                id='createUserFormEmail'
                autoComplete='off'
                ref={emailRef}
              />
            </label>

            {/* Password */}
            <label htmlFor='createUserFormPassword'>
              <h3>Write your password (min. 6)</h3>
              <input
                className='outline-none border-b-2 border-black'
                type='text'
                id='createUserFormPassword'
                autoComplete='off'
                ref={passwordRef}
              />
            </label>

            {/* Confirm Password */}
            <label htmlFor='createUserFormConfirmPassword'>
              <h3>Confirm your password</h3>
              <input
                className='outline-none border-b-2 border-black'
                type='text'
                id='createUserFormConfirmPassword'
                autoComplete='off'
                ref={confirmPaswordRef}
              />
            </label>

            <p>
              Already a member?
              <span
                onClick={openModal}
                className='font-bold cursor-pointer ml-2'>
                Login
              </span>
            </p>

            <input
              className='py-2 px-5 bg-main-color w-fit mx-auto cursor-pointer'
              type='submit'
              value='Create an account'
            />
          </form>
        </div>
      </>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleLoggedIn}
      onUserNotLoggedIn={handleCreateUserForm}>
      <h3>Loading...</h3>
    </AuthProvider>
  );
};

export default CreateUser;

import React, { useEffect } from 'react';
import { auth } from '../firebase/index';

import { onAuthStateChanged } from 'firebase/auth';

const AuthProvider = ({ children, onUserLoggedIn, onUserNotLoggedIn }) => {
  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  async function handleUserStateChanged(user) {
    // console.log(user);
    if (!user) {
      onUserNotLoggedIn();
      return;
    }

    onUserLoggedIn(user.uid);
  }

  return <>{children}</>;
};

export default AuthProvider;

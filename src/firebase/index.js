import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, query, where, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app),
  auth = getAuth(app);

async function registerUser(user) {
  try {
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, user);
  } catch (e) {
    console.error(e)
  }
}

async function getUserInfo(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    // console.log('Ok')
    return docSnap.data();
  } catch (error) {
    console.log(error)
  }
}

async function getMeals(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data().likedMeals;
  } catch (error) {
    console.log(error)
  }
}

async function checkEmailAvailable(email) {
  const users = [];
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('email', '==', email));
  // console.log(q);

  const querySnapShot = await getDocs(q);
  querySnapShot.forEach(doc => {
    users.push(doc.data());
  });
  // console.log(users)
  return users;
}

async function uidExists(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error(error);
  }
}

async function updateUser(uid, info) {
  // console.log(uid)
  // console.log(info)
  try {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, info);
  } catch (error) {
    console.error(error);
  }
}

export { auth, getUserInfo, registerUser, checkEmailAvailable, getMeals, uidExists, updateUser }
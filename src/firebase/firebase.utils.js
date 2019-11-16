import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA2NRX0LTgIb5dQvC46RtbcdocasQ9r2Ig",
  authDomain: "egebeya-be.firebaseapp.com",
  databaseURL: "https://egebeya-be.firebaseio.com",
  projectId: "egebeya-be",
  storageBucket: "egebeya-be.appspot.com",
  messagingSenderId: "933134200275",
  appId: "1:933134200275:web:8feac27ae2310d76301326",
  measurementId: "G-44KB4Z4HZN"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

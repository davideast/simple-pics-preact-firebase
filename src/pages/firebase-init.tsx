import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { Component } from 'preact';

import { AppUser } from '../components/interfaces';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBui6v9Ciy8TCoWzKj0GngEtA-rpZ7ja_4",
  authDomain: "simple-pics.firebaseapp.com",
  projectId: "simple-pics",
  storageBucket: "simple-pics.appspot.com",
  messagingSenderId: "694322561017"
});

const firestore = firebaseApp.firestore();
firestore.enablePersistence();

const asyncFirebaseApp = {
  async auth() {
    await import('@firebase/auth');
    return firebaseApp.auth();
  },
  async storage() {
    await import('@firebase/storage');
    return firebaseApp.storage();
  }
}

export const asyncAuthListener = async (comp: Component<any, any>) => {
  const auth = await asyncFirebaseApp.auth();
  return auth.onAuthStateChanged(user => {
    comp.setState({ ...comp.state, user });
  });
};

export const getAuthenticatedUser = async () => {
  const auth = await asyncFirebaseApp.auth();
  return new Promise<AppUser>((resolve, reject) => {
    const unsub = auth.onAuthStateChanged(user => {
      if(user !== null) {
        resolve(user);
        unsub(); 
      }
    }, reject);
  });
}

export { firebaseApp, firestore, asyncFirebaseApp }

import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { Component } from 'preact';

import { FeedItem } from '../components/card';
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

export const authState$ = {
  async subscribe(callback: (user?: AppUser) => void) {
    const auth = await asyncFirebaseApp.auth();
    return auth.onAuthStateChanged(callback);
  }
};

export const feedItem$ = {
  subscribe(callback: (feedItems: FeedItem[]) => void) {
    const feedCol = firestore.collection('feed');
    return feedCol
      .orderBy('timestamp', 'desc')
      .onSnapshot(snap => {
        const feedItems = snap.docs.map(d => d.data() as FeedItem);
        callback(feedItems);
      }, console.error);
  }
}

export { firebaseApp, firestore, asyncFirebaseApp }

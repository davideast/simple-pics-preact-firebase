import { firebase } from '@firebase/app';
import '@firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBui6v9Ciy8TCoWzKj0GngEtA-rpZ7ja_4",
  authDomain: "simple-pics.firebaseapp.com",
  projectId: "simple-pics",
  storageBucket: "simple-pics.appspot.com",
  messagingSenderId: "694322561017"
});

const firestore = firebaseApp.firestore();
firestore.enablePersistence();

export { firebaseApp, firestore }

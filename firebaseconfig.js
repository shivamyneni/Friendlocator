import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCvkxAw3NtW0N4y-DaEekNLdk0RpkkweEM',
  authDomain: 'friendslocator-mapbod.firebaseapp.com',
  projectId: 'friendslocator-mapbod',
  storageBucket: 'friendslocator-mapbod.appspot.com',
  messagingSenderId: '737372462340',
  appId: '1:737372462340:web:41e64761ca20f044fe4451',
  measurementId: 'G-KLEDCQ613T',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({experimentalForceLongPolling: true});
} else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const auth = firebase.auth();

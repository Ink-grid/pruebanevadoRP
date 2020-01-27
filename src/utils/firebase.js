import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDxzwfkLf4cTtc4i2XRHmbw_QUQxip-Oy0',
  authDomain: 'nevado-store.firebaseapp.com',
  databaseURL: 'https://nevado-store.firebaseio.com',
  projectId: 'nevado-store',
  storageBucket: 'nevado-store.appspot.com',
  messagingSenderId: '495641896966',
  appId: '1:495641896966:web:bd4cfac52ad610ba807b87',
  measurementId: 'G-X0GQL5FC95'
};

firebase.initializeApp(firebaseConfig);
export const { auth } = firebase;
export const provider = new firebase.auth.FacebookAuthProvider();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerGithub = new firebase.auth.GithubAuthProvider();
export const storage = firebase.storage();
export const database = firebase.database();

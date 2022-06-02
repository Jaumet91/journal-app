// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDxvqljU0_uabj-8lj8dRsocFMCK4WBuV0',
  authDomain: 'react-app-udemy-9ab5e.firebaseapp.com',
  projectId: 'react-app-udemy-9ab5e',
  storageBucket: 'react-app-udemy-9ab5e.appspot.com',
  messagingSenderId: '374556779305',
  appId: '1:374556779305:web:ba1a14bc2fe404314d0d38',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };

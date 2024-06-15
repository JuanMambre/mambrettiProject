
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDxKEUuhBLAzsDvIOjCgh-i-QPGZvvGEQ8",
    authDomain: "react-coder-19227.firebaseapp.com",
    projectId: "react-coder-19227",
    storageBucket: "react-coder-19227.appspot.com",
    messagingSenderId: "530076165336",
    appId: "1:530076165336:web:666e3a872bf9364716e3ad",
    measurementId: "G-H0TJTXYKYQ"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
 
  export { auth, db, storage}
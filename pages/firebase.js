// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2nD3697q76-cOt7MykEfc074s2JBmrUs",
  authDomain: "surprise-b70b4.firebaseapp.com",
  projectId: "surprise-b70b4",
  storageBucket: "surprise-b70b4.firebasestorage.app",
  messagingSenderId: "1861276383",
  appId: "1:1861276383:web:1ef394c66085e88a3d0f6a",
  measurementId: "G-45QK1NMRDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8FtFJviXkxphLy3g7kWqHrg5rEUQznxE",
  authDomain: "e-commerce-live.firebaseapp.com",
  projectId: "e-commerce-live",
  storageBucket: "e-commerce-live.appspot.com",
  messagingSenderId: "455720389307",
  appId: "1:455720389307:web:d2d94445ba9867fffe379e",
  measurementId: "G-VTWG9LRS39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
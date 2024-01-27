// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-f78ad.firebaseapp.com",
  projectId: "mern-blog-app-f78ad",
  storageBucket: "mern-blog-app-f78ad.appspot.com",
  messagingSenderId: "1030193932294",
  appId: "1:1030193932294:web:941e7813cdfc8f906cbb87"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjhMku59DxWZVnv7ZVAcAqu4xXNm4E3bI",
  authDomain: "rice-shop-d5bfe.firebaseapp.com",
  projectId: "rice-shop-d5bfe",
  storageBucket: "rice-shop-d5bfe.firebasestorage.app",
  messagingSenderId: "213809767626",
  appId: "1:213809767626:web:ca8db16b14d398d9b90033",
  measurementId: "G-THZB28KE7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth()
const provider = new GoogleAuthProvider()
export {auth , provider}
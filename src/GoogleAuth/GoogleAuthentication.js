// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDjhMku59DxWZVnv7ZVAcAqu4xXNm4E3bI",
//   authDomain: "rice-shop-d5bfe.firebaseapp.com",
//   projectId: "rice-shop-d5bfe",
//   storageBucket: "rice-shop-d5bfe.firebasestorage.app",
//   messagingSenderId: "213809767626",
//   appId: "1:213809767626:web:ca8db16b14d398d9b90033",
//   measurementId: "G-THZB28KE7M"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDH-gFdmbiFlEGA_ft2EenpzfHlaQATxTE",
  authDomain: "rice-store-dd952.firebaseapp.com",
  projectId: "rice-store-dd952",
  storageBucket: "rice-store-dd952.firebasestorage.app",
  messagingSenderId: "108785264005",
  appId: "1:108785264005:web:6d2cfcd1d15a82208cd0ec",
  measurementId: "G-9QGSYH85MF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth()
const provider = new GoogleAuthProvider()
export { auth, provider }


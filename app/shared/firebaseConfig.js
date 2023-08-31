// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCVJtb9rOidmxrTyKiQHtE8Rmn0DcMD3w",
  authDomain: "printrest-clone-c86da.firebaseapp.com",
  projectId: "printrest-clone-c86da",
  storageBucket: "printrest-clone-c86da.appspot.com",
  messagingSenderId: "104959618868",
  appId: "1:104959618868:web:e161003b6bd76654ccbf61",
  measurementId: "G-4GK4FH8NQ8"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
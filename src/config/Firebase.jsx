import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// firestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8a7227HjyfU1mmTooyyVCFsYxl0VlfI8",
  authDomain: "yt-learn-6a864.firebaseapp.com",
  projectId: "yt-learn-6a864",
  storageBucket: "yt-learn-6a864.firebasestorage.app",
  messagingSenderId: "805802989543",
  appId: "1:805802989543:web:db246241ff9c578e38cf42"
};

 
const app = initializeApp(firebaseConfig);
// auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
// firestore
export const db = getFirestore(app)
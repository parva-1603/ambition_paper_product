// Firebase configuration
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARV_0xiNcbfrimUW94Bb6UYBCubzWURcI",
  authDomain: "ambition-paper-e-shop.firebaseapp.com",
  projectId: "ambition-paper-e-shop",
  storageBucket: "ambition-paper-e-shop.firebasestorage.app",
  messagingSenderId: "32390353807",
  appId: "1:32390353807:web:5450d62757276e086831fa",
  measurementId: "G-NNTZYQ171Y"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

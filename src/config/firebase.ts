// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDltFcahCf8T8_5PvVnD1IzWDHqD1h1lw",
  authDomain: "edtech-20e80.firebaseapp.com",
  projectId: "edtech-20e80",
  storageBucket: "edtech-20e80.firebasestorage.app",
  messagingSenderId: "230871658221",
  appId: "1:230871658221:web:c840b537bdf931534c26e4",
  measurementId: "G-1FXX151YN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
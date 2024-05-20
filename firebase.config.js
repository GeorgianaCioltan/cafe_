// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrLWD6LsQ5AQjv61e0WJORKvF_CW5aQt4",
  authDomain: "cafe-7e494.firebaseapp.com",
  projectId: "cafe-7e494",
  storageBucket: "cafe-7e494.appspot.com",
  messagingSenderId: "283972662063",
  appId: "1:283972662063:web:434f4352fdf3521696a7da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, db, auth };

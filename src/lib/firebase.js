// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANTE: Reemplaza esto con tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLABCD1234567890XYZ", // Reemplazar
  authDomain: "checkgranada-project.firebaseapp.com",
  projectId: "checkgranada-project",
  storageBucket: "checkgranada-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890",
  measurementId: "G-1234567890",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;

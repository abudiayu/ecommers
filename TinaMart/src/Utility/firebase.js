import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW7S_auZ27-DpiKiIBszwMC7WDgJHDs1E",
  authDomain: "tina-bay.firebaseapp.com",
  projectId: "tina-bay",
  storageBucket: "tina-bay.firebasestorage.app",
  messagingSenderId: "748384631888",
  appId: "1:748384631888:web:1ddfe40fd08d010922e555",
  measurementId: "G-97PF3CQVCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;


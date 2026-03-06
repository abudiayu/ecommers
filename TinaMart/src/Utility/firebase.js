import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;


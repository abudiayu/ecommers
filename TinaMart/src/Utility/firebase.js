import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvHkQwHsUYEfnpDt2uYR3G5g2BubyJrIY",
  authDomain: "fir-196c7.firebaseapp.com",
  projectId: "fir-196c7",
  storageBucket: "fir-196c7.firebasestorage.app",
  messagingSenderId: "1020882852258",
  appId: "1:1020882852258:web:a0d8ce878b94ed2e4abafb",
  measurementId: "G-97PF3CQVCW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;

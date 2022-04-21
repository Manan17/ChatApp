import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB5alPfUcP3xSmRAftu7TNDgVI7-0eu9qg",
  authDomain: "chatapp-8bc19.firebaseapp.com",
  projectId: "chatapp-8bc19",
  storageBucket: "chatapp-8bc19.appspot.com",
  messagingSenderId: "648561901779",
  appId: "1:648561901779:web:903807302bb097b3e6d426",
  measurementId: "G-4MFWC472YN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };

import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_HOTbLNazVKbRMLE1uhSwOs1Z3Hj3mpk",
  authDomain: "chatgpt-clone-b9c34.firebaseapp.com",
  projectId: "chatgpt-clone-b9c34",
  storageBucket: "chatgpt-clone-b9c34.appspot.com",
  messagingSenderId: "551809703773",
  appId: "1:551809703773:web:b7e9ca21aa11dc982592b4",
  measurementId: "G-DQL4Y4R2WF",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };

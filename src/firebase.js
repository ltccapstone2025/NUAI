import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAa0gLBrXTkp3yNygGUWN10Q61Otc4uqJE",
  authDomain: "nuai-9cedc.firebaseapp.com",
  projectId: "nuai-9cedc",
  storageBucket: "nuai-9cedc.firebasestorage.app",
  messagingSenderId: "901062825524",
  appId: "1:901062825524:web:1d4a9de4f8b772b81c1c61",
  measurementId: "G-HK9RMRJ0EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app)

export {app, auth, firestore};
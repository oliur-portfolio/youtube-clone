import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "clone-c80a5.firebaseapp.com",
    projectId: "clone-c80a5",
    storageBucket: "clone-c80a5.appspot.com",
    messagingSenderId: "378785681477",
    appId: "1:378785681477:web:db0053f140c2b687b8532c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

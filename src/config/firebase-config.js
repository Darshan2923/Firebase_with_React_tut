// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgT-PWtnTmnh61uCbbC9z0wSTIj8-Xx0Q",
    authDomain: "fir-course-56dc0.firebaseapp.com",
    projectId: "fir-course-56dc0",
    storageBucket: "fir-course-56dc0.appspot.com",
    messagingSenderId: "814336063979",
    appId: "1:814336063979:web:1fafb4e741e074ef97c1ae",
    measurementId: "G-ZF0ELLTVXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const gprovider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const bucket = getStorage(app);
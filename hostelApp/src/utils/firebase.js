// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {



  apiKey: "AIzaSyACwDNSgQT-s3OLebbxGqCmkJYO6c0UJBo",
  authDomain: "hostel-booking-ug.firebaseapp.com",
  projectId: "hostel-booking-ug",
  storageBucket: "hostel-booking-ug.firebasestorage.app",
  messagingSenderId: "512360527669",
  appId: "1:512360527669:web:5b8f0dac957ab06383be7c",
  measurementId: "G-2T6CFK13T7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
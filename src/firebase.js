// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJtIEw3F2ONvPe3tueQ_cXSZQfNyUizpA",
  authDomain: "ai-health-dasboard.firebaseapp.com",
  projectId: "ai-health-dasboard",
  storageBucket: "ai-health-dasboard.firebasestorage.app",
  messagingSenderId: "1020760213182",
  appId: "1:1020760213182:web:741b803baad4500fea40ef",
  measurementId: "G-R35JRT3JD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

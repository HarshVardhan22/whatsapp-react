// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0gnsqUAYLHUqTk_GpHna7ycGyVflYvXo",
  authDomain: "whatsapp-react-a025e.firebaseapp.com",
  projectId: "whatsapp-react-a025e",
  storageBucket: "whatsapp-react-a025e.appspot.com",
  messagingSenderId: "260128475214",
  appId: "1:260128475214:web:1f161e706a6b88a8739b1f",
  measurementId: "G-7T3NSTDW9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
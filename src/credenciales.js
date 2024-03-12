// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP0Pphgn11DQfR1ppHGM9vA6GndM2YwjI",
  authDomain: "microproyecto2-d5ac6.firebaseapp.com",
  projectId: "microproyecto2-d5ac6",
  storageBucket: "microproyecto2-d5ac6.appspot.com",
  messagingSenderId: "896321588674",
  appId: "1:896321588674:web:b5cd0c060985fd60f05a5b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase
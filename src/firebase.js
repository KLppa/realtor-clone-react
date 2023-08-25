// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwzOQTFdJiisbCxtjWWdk7NJVuRym-SCQ",
  authDomain: "realtor-clone-react-19855.firebaseapp.com",
  projectId: "realtor-clone-react-19855",
  storageBucket: "realtor-clone-react-19855.appspot.com",
  messagingSenderId: "65695112953",
  appId: "1:65695112953:web:ab3c704b6a5653f9e44c28",
  measurementId: "G-MTZNQJLB9D",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

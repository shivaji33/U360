// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJz4hizoIEP86HZnYZ4AmT7-bNgkw02W0",
  authDomain: "expense-tracker-9ac2e.firebaseapp.com",
  projectId: "expense-tracker-9ac2e",
  storageBucket: "expense-tracker-9ac2e.appspot.com",
  messagingSenderId: "134688866197",
  appId: "1:134688866197:web:734f80934b7583fb20809c",
  measurementId: "G-Y31FYEQZ3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
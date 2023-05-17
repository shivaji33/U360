// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';

import { getFirestore } from "firebase/firestore";

import { getStorage} from 'firebase/storage';


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

export const BUCKET_URL = "gs://expense-tracker-9ac2e.appspot.com";


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export const storage = getStorage();


export default db;

function storageBucket(app: FirebaseApp, arg1: string) {
  throw new Error("Function not implemented.");
}

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase.init";

const googleAuthProvider = new GoogleAuthProvider();

export const googleSignIn = () => signInWithPopup(auth, googleAuthProvider);

export const userLogout = () => signOut(auth);

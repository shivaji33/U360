import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../localStorage/localStorage";
import { AUTH_DATA } from "../localStorage/localStorage.constant";
import { auth } from "./firebase.init";

const googleAuthProvider = new GoogleAuthProvider();

export const googleSignIn = () => signInWithPopup(auth, googleAuthProvider);

export const useUserLogout = () => {
  const navigate = useNavigate();
  return () => {
    signOut(auth);
    removeLocalStorageItem(AUTH_DATA);
    navigate("/login");
  };
};

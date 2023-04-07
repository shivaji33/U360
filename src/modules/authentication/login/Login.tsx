import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { googleSignIn } from "../../../firebase/auth";
import { setLocalStorageItem } from "../../../localStorage/localStorage";
import { AUTH_DATA } from "../../../localStorage/localStorage.constant";
import classes from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const data = await googleSignIn();
    if (data.user) {
      setLocalStorageItem(AUTH_DATA,data.user);
      navigate('/');
    }
  }
  return (
    <div className={classes["login-wrapper"]}>
      <h1 className="text-4xl font-bold mb-5">Welcome to U360!</h1>
      <Button
        type="button"
        className="btn-primary"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default Login;

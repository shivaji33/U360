import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAuthData } from "../localStorage/authData";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getUserAuthData()) {
        navigate('/login', {replace: true});
      }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;

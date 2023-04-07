import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { getUserAuthData } from "../localStorage/authData";

const UnProtectedRoute = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getUserAuthData()) {
            navigate('/', {replace: true});
          }
      }, [navigate]);
 
 return children

};

export default UnProtectedRoute;
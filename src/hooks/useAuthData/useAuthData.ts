import { useEffect, useState } from "react";
import { getLocalStorageItem } from "../../localStorage/localStorage";
import { AUTH_DATA } from "../../localStorage/localStorage.constant";

export function useAuthData() {
    const [authData, setAuthData] = useState<any | null>(null);
  
    useEffect(() => {
      const authDataFromLocalStorage = getLocalStorageItem<any>(AUTH_DATA);
      if (authDataFromLocalStorage) {
        setAuthData(authDataFromLocalStorage);
      }
    }, []);
  
    return authData;
  }
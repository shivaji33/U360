import { getLocalStorageItem } from "./localStorage";
import { AUTH_DATA } from "./localStorage.constant";

export const getUserAuthData = () => {
   return getLocalStorageItem<any>(AUTH_DATA);
}
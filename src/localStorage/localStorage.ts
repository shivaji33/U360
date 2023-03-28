export const setLocalStorageItem = (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting local storage item:', error);
    }
  };
  
  export const getLocalStorageItem = <T>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting local storage item:', error);
      return null;
    }
  };
  
  export const removeLocalStorageItem = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing local storage item:', error);
    }
  };
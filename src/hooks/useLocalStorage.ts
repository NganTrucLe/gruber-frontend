'use client';

/**
 *
 * @param key String key to store in local storage
 * @returns
 */
function useLocalStorage() {
  // Get from local storage by key
  const getStoredValue = (key: string): any => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Persist the new value to localStorage
  const setStoredValue = (key: string, value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const removeStoredValue = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { getStoredValue, setStoredValue, removeStoredValue };
}

export default useLocalStorage;

'use client';

/**
 *
 * @param key String key to store in local storage
 * @returns
 */
function useLocalStorage(key: string) {
  // Get from local storage by key
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Persist the new value to localStorage
  const setStoredValue = (value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStoredValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { getStoredValue, setStoredValue, deleteStoredValue };
}

export default useLocalStorage;

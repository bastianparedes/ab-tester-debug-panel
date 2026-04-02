import { useEffect, useState } from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

function useSessionStorage<T>(key: string, initialValue: T | null): [T | null, SetValue<T | null>] {
  const readValue = (): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('Error leyendo sessionStorage:', error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T | null>(readValue);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error escribiendo en sessionStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useSessionStorage;

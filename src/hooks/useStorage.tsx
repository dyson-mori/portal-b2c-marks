import { ProductsProps } from '@/global/interfaces';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// type Response<T> = [
//   T,
//   Dispatch<SetStateAction<T>>,
// ];

function usePersistedStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState<any>(() => {
    const storageValue = typeof window !== "undefined" ? localStorage.getItem(key) : false;

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedStorage;
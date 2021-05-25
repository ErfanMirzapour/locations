import { useEffect, useState } from 'react';

const parse = (str: string | null = null) => {
   try {
      return JSON.parse(str!);
   } catch {
      return str;
   }
};

const useSessionStorage = <T>(key: string, init?: T | (() => T)) => {
   const persist = (newState?: T) => {
      const serializedState = JSON.stringify(newState);

      sessionStorage?.setItem(key, serializedState);
   };

   const [state, setState] = useState<T>(() => {
      const initialize = init instanceof Function ? init() : init;

      if (sessionStorage) {
         let storedInit = parse(sessionStorage.getItem(key));

         if (storedInit) return storedInit;

         if (initialize) persist(initialize);
      }
      return initialize;
   });

   useEffect(() => {
      const onStorageChange = (e: StorageEvent) => {
         if (e.storageArea === sessionStorage && e.key === key)
            setState(e.newValue as any);
      };

      window.addEventListener('storage', onStorageChange, { capture: true });

      return () => window.removeEventListener('storage', onStorageChange);
   }, [key]);

   const setSessionState: React.Dispatch<React.SetStateAction<T>> =
      newState => {
         if (newState instanceof Function) persist(newState(state));
         else persist(newState);

         setState(newState);
      };

   return [state, setSessionState] as const;
};

export default useSessionStorage;

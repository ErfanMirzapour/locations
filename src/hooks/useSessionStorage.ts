import { useState } from 'react';

const useSessionStorage = <T>(key: string, init: T | (() => T)) => {
   const persist = (newState: T) => {
      const serializedState = JSON.stringify(newState);

      sessionStorage?.setItem(key, serializedState);
   };

   const [state, setState] = useState(() => {
      const initialize = init instanceof Function ? init() : init;

      if (sessionStorage) {
         let storedInit = JSON.parse(sessionStorage.getItem(key)!);

         if (storedInit) return storedInit;

         persist(initialize);
      }
      return initialize;
   });

   const setSessionState: React.Dispatch<React.SetStateAction<T>> =
      newState => {
         if (newState instanceof Function) persist(newState(state));
         else persist(newState);

         setState(newState);
      };

   return [state, setSessionState] as const;
};

export default useSessionStorage;

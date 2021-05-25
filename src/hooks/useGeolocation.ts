import { useState, useEffect, useCallback } from 'react';

import { Coordination } from 'types';

const useGeolocation = (locateOnMount?: boolean) => {
   const [location, setLocation] = useState<Coordination | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   const onSuccess: PositionCallback = ({ coords }) => {
      setLocation({ lat: coords.latitude, lng: coords.longitude });
      setLoading(false);
   };

   const locate = useCallback(() => {
      setLoading(true);
      navigator?.geolocation.getCurrentPosition(
         onSuccess,
         e => {
            setError(e.message);
            setLoading(false);
            console.log(e);
         },
         {
            timeout: 5000,
         }
      );
   }, []);

   useEffect(() => {
      if (locateOnMount) locate();
   }, [locateOnMount, locate]);

   return { location, error, loading, locate };
};

export default useGeolocation;

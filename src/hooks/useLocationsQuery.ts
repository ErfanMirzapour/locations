import { useQuery } from 'react-query';

interface Coordination {
   lat: number;
   lng: number;
}

interface Location {
   id: number;
   coords: Coordination;
   name: string;
}

const useLocationsQuery = () =>
   useQuery<Location[]>('locations', async () => {
      const res = await fetch('/locations');
      if (res.ok) return res.json();
      throw Error(res.statusText);
   });

export default useLocationsQuery;

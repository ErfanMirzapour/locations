import { useQuery, UseQueryOptions } from 'react-query';

import { Location } from 'types';

const useLocationsQuery = (options?: UseQueryOptions<Location[]>) =>
   useQuery<Location[]>(
      'locations',
      async () => {
         const res = await fetch('/locations');
         if (res.ok) return res.json();
         throw Error(res.statusText);
      },
      options
   );

export default useLocationsQuery;

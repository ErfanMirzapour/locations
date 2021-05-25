import { memo } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { useLocationsQuery } from 'hooks';

interface Props {
   userId: number;
}

const Locations = memo(({ userId }: Props) => {
   const { data: locations } = useLocationsQuery();

   return (
      <>
         {locations?.map(({ coords, id, name }) => (
            <Marker
               key={id}
               position={[coords.lat, coords.lng]}
               opacity={id === userId ? 1 : 0.6}
            >
               <Popup>{name}</Popup>
            </Marker>
         ))}
      </>
   );
});

export default Locations;

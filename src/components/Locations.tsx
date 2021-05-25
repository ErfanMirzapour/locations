import { useLocationsQuery } from 'hooks';
import { Marker, Popup } from 'react-leaflet';

const Locations = () => {
   const { data: locations } = useLocationsQuery();

   return (
      <>
         {locations?.map(({ coords, id, name }) => (
            <Marker key={id} position={[coords.lat, coords.lng]}>
               <Popup>{name}</Popup>
            </Marker>
         ))}
      </>
   );
};

export default Locations;

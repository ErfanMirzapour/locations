import {
   useEffect,
   useRef,
   useState,
   MouseEvent,
   Dispatch,
   SetStateAction,
} from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';

import { useGeolocation, useLocationMutation, useLocationsQuery } from 'hooks';
import { CircularButton } from './styled';

interface Props {
   userId: number;
   setUserId: Dispatch<SetStateAction<number>>;
}

const AddLocation = ({ userId, setUserId }: Props) => {
   const { location, loading, locate } = useGeolocation();
   const [selectedLocation, setSelectedLocation] = useState(location);
   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const { data } = useLocationsQuery({
      select: locations => [locations.find(loc => loc.id === userId)!],
   });
   const { mutate } = useLocationMutation(userId ? 'UPDATE' : 'CREATE');

   const marker = useRef<any>();
   const map = useMapEvent(
      'click',
      e => !loading && setSelectedLocation({ ...e.latlng })
   );

   // Changes selected location after finding user's location and animates to it
   useEffect(() => {
      if (location) {
         setSelectedLocation(location);
         map.flyTo([location.lat, location.lng]);
      }
   }, [location, map]);

   // Opens marker's popup after mounting
   useEffect(() => {
      marker.current?.openPopup();
   }, [selectedLocation]);

   const submitLocation = () => {
      if (!isPopupOpen) return;

      let name: string;
      const prevLocation = data?.[0];
      
      if (prevLocation !== undefined) ({ name } = prevLocation);
      else name = prompt('Enter your name:')!;

      mutate(
         {
            userId,
            location: {
               coords: { ...selectedLocation! },
               name,
            },
         },
         {
            onSuccess: (data: any) => {
               setSelectedLocation(null);
               setUserId(data.id);
            },
         }
      );
   };

   const findMyLocation = (e: MouseEvent) => {
      e.stopPropagation();
      locate();
   };

   return (
      <>
         <CircularButton
            title='Find my location'
            onClickCapture={findMyLocation}
            // Prevents the event to be propagated to the map
            onDoubleClickCapture={e => e.stopPropagation()}
         >
            <span className='material-icons'>my_location</span>
         </CircularButton>

         {selectedLocation && (
            <Marker
               position={[selectedLocation.lat, selectedLocation.lng]}
               ref={marker}
               eventHandlers={{ click: submitLocation }}
            >
               <Popup
                  onOpen={() => setIsPopupOpen(true)}
                  onClose={() => setIsPopupOpen(false)}
               >
                  Click on the marker to submit the location.
               </Popup>
            </Marker>
         )}
      </>
   );
};

export default AddLocation;

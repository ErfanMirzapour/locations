// import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { Locations, AddLocation } from 'components';
import {  useSessionStorage } from 'hooks';

const App = () => {
   const [userId, setUserId] = useSessionStorage<number>('id');
   // const { mutate } = useDeleteLocation();

   // Delete user data after closing the tab
   // useEffect(() => {
   //    const beforeUnload = () => {
   //       if (userId) mutate({ userId });
   //    };

   //    window.addEventListener('beforeunload', beforeUnload);

   //    return () => window.removeEventListener('beforeunload', beforeUnload);
   // }, [mutate, userId]);

   return (
      <MapContainer
         center={[42.1634034, 21.4453125]}
         zoom={4}
         scrollWheelZoom={true}
      >
         <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
         />

         <Locations userId={userId} />
         <AddLocation userId={userId} setUserId={setUserId} />
      </MapContainer>
   );
};

export default App;

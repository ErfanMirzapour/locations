import { MapContainer, TileLayer } from 'react-leaflet';

import { Locations } from 'components';

function App() {
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
         <Locations />
      </MapContainer>
   );
}

export default App;

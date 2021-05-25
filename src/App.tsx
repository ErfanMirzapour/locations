import { MapContainer, TileLayer } from 'react-leaflet';

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
      </MapContainer>
   );
}

export default App;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

// Custom marker icon (optional)
const customMarkerIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
  iconSize: [38, 38],
});

const CityMap = () => {
  // Array of cities with names and coordinates (latitude, longitude)
  const cities = [
    { name: 'Ahmedabad', position: [23.0225, 72.5714] },
    { name: 'Rajkot', position: [22.3039, 70.8022] },
    { name: 'Mumbai', position: [19.0760, 72.8777] },
    { name: 'Delhi', position: [28.7041, 77.1025] },
    { name: 'Pune', position: [18.5204, 73.8567] },
  ];

  return (
    <div style={{ height: "500px" }}>
      <MapContainer center={cities[0].position} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map((city, index) => (
          <Marker key={index} position={city.position}>
            <Popup>
              City Name: {city.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CityMap;

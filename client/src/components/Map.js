import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const petrolStationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/293/293398.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hotelIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/219/219183.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({ filter, searchTerm }) => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const url = filter === 'all' ? '/api/locations' : `/api/locations/${filter}`;
    axios.get(url)
      .then(res => {
        setLocations(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [filter]);

  useEffect(() => {
    setFilteredLocations(
      locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, locations]);

  return (
    <MapContainer center={[7.1577, 3.3438]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredLocations.map(location => (
        <Marker
          key={location._id}
          position={[location.coordinates.lat, location.coordinates.lng]}
          icon={location.type === 'petrol station' ? petrolStationIcon : hotelIcon}
        >
          <Popup>
            <h3>{location.name}</h3>
            <p>{location.address}</p>
            <p>{location.contact}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

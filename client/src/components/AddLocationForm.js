import React, { useState } from 'react';
import axios from 'axios';

const AddLocationForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [type, setType] = useState('petrol station');
  const [contact, setContact] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const newLocation = {
      name,
      address,
      coordinates: {
        lat,
        lng,
      },
      type,
      contact,
    };
    axios.post('/api/locations', newLocation)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        type="number"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="petrol station">Petrol Station</option>
        <option value="hotel">Hotel</option>
      </select>
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button type="submit">Add Location</button>
    </form>
  );
};

export default AddLocationForm;

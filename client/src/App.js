import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import AddLocationForm from './components/AddLocationForm';

function App() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">Abeokuta Maps</a>
        </div>
        <ul className="navbar-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
<div className="controls">
  <input
    type="text"
    placeholder="Search for a location..."
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button onClick={() => setFilter('all')}>All</button>
  <button onClick={() => setFilter('petrol station')}>Petrol Stations</button>
  <button onClick={() => setFilter('hotel')}>Hotels</button>
</div>
      <div className="map-container">
  <Map filter={filter} searchTerm={searchTerm} />
      </div>
<AddLocationForm />
    </div>
  );
}

export default App;

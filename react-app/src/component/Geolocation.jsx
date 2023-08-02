
Luis Alberto .
lun, 31 jul, 19:15 (hace 2 días)
para mí

import React, { useState } from 'react';
import axios from 'axios';

const AddressToLatLngConverter = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=`;

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const convertToLatLng = () => {
    if (address.trim() !== '') {
      axios
        .get(geocodeUrl + encodeURIComponent(address))
        .then((response) => {
          const result = response.data.results[0];
          if (result) {
            setLatitude(result.geometry.location.lat);
            setLongitude(result.geometry.location.lng);
          } else {
            // Handle address not found error
            console.log('Address not found.');
          }
        })
        .catch((error) => {
          // Handle API call error
          console.log('Error fetching data:', error);
        });
    }
  };

  return (
    <div>
      <input type="text" value={address} onChange={handleAddressChange} />
      <button onClick={convertToLatLng}>Convert</button>
      {latitude && longitude && (
        <div>
          Latitude: {latitude}, Longitude: {longitude}
        </div>
      )}
    </div>
  );
};

export default AddressToLatLngConverter;

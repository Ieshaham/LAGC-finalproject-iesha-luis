import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Details() {
  const { listIndex } = useParams(); // Get the list index from the URL parameter

  // Retrieve saved lists from local storage
  const savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];

  // Check if the list index is valid
  if (listIndex < 0 || listIndex >= savedLists.length) {
    return (
      <div>
        <h1>Invalid List</h1>
        <p>The requested list does not exist.</p>
        <Link to="/saved">Back to Saved Itineraries</Link>
      </div>
    );
  }

  const list = savedLists[listIndex]; // Get the selected list

  return (
    <div>
      <h1>Itinerary Details</h1>
      <h2>List Name: {list.customName || list.location}</h2>
      <h3>Places:</h3>
      <ul>
        {list.places.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))}
      </ul>
      <Link to="/saved">Back to Saved Itineraries</Link>
    </div>
  );
}

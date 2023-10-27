import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css';
import Map from './Map';

export default function ListPage() {
  // State initialization
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Load autocomplete when the component mounts
    loadAutocomplete();
  }, []);

  // Function to load Google Places Autocomplete
  const loadAutocomplete = () => {
    // Load the Google Maps API with your API key
    const googleMapsApiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  };

  // Function to initialize Autocomplete
  const initAutocomplete = () => {
    const autocompleteInput = document.getElementById('autocomplete-input');
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput);

    autocomplete.addListener('place_changed', () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.geometry) {
        // Add selected place to the list
        addSelectedPlace(selectedPlace);
      }
    });
  };

  // Function to add a selected place to the list
  const addSelectedPlace = (selectedPlace) => {
    const newSelectedPlace = { name: selectedPlace.name, date: '', time: '' };
    setSelectedPlaces((prevSelectedPlaces) => [...prevSelectedPlaces, newSelectedPlace]);
    setAutocompleteValue('');
    document.getElementById('autocomplete-input').value = '';
  };

  // Function to handle date change for a selected place
  const handleDateChange = (index, newDate) => {
    const updatedSelectedPlaces = [...selectedPlaces];
    updatedSelectedPlaces[index].date = newDate;
    setSelectedPlaces(updatedSelectedPlaces);
  };

  // Function to handle time change for a selected place
  const handleTimeChange = (index, newTime) => {
    const updatedSelectedPlaces = [...selectedPlaces];
    updatedSelectedPlaces[index].time = newTime;
    setSelectedPlaces(updatedSelectedPlaces);
  };

  // Function to delete a selected place
  const handleDeletePlace = (index) => {
    const updatedSelectedPlaces = [...selectedPlaces];
    updatedSelectedPlaces.splice(index, 1);
    setSelectedPlaces(updatedSelectedPlaces);
  };

  // Function to save the list
  const handleSaveList = () => {
    const savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];
    const timestamp = new Date().toLocaleString();
    const newSavedList = { timestamp, places: selectedPlaces };
    savedLists.push(newSavedList);
    localStorage.setItem('savedLists', JSON.stringify(savedLists));
  };

  // Function to navigate back to the Explore page
  const goBack = () => {
    let path = `/explore`;
    navigate(path);
  };

  return (
    <div className="list-page">
      <NavBar />

      <button className="go-back-button-on-list" onClick={goBack}>
        &larr; Go back
      </button>
      <h1 className="list-title">Customize your Voyage</h1>
      <div className="search-box-on-list">
        {/* Autocomplete input */}
        <input
          id="autocomplete-input"
          type="text"
          value={autocompleteValue}
          onChange={(e) => setAutocompleteValue(e.target.value)}
          className="input"
        />
        {/* Autocomplete suggestions */}
        <div className="autocomplete-suggestions">
          {autocompleteSuggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="suggestion"
              onClick={() => {
                setAutocompleteValue(suggestion.description);
                setAutocompleteSuggestions([]);
              }}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      </div>
      {/* Selected places list */}
      <div className="selected-places-list">
        <table className="table-list">
          <thead>
            <tr>
              <th className="place-name">Place Name</th>
              <th className="place-action">Date & Time</th>
              <th className="place-action">Action</th>
            </tr>
          </thead>
          <tbody className="list-tbody">
            {selectedPlaces.map((place, index) => (
              <tr key={index}>
                <td className="list-td">{place.name}</td>
                <td className="list-td">
                  {/* Date and Time inputs */}
                  <input
                    type="date"
                    value={place.date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                  />
                  <input
                    type="time"
                    value={place.time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                  />
                </td>
                <td className="list-delete">
                  {/* Delete button */}
                  <button className="list-button" onClick={() => handleDeletePlace(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Save List button */}
      <button className="save-list-button" onClick={handleSaveList}>
        Save List
      </button>
      {/* Link to Saved component */}
      <Link to="/saved-lists" className="link-to-saved-list">
        Go to Saved List
      </Link>
      {/* <Map places={selectedPlaces} /> */}
    </div>
  );
}





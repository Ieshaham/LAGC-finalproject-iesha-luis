import React, { useState, useEffect } from "react";

function Explore() {
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  useEffect(() => {
    loadAutocomplete();
  }, []);

  const loadAutocomplete = () => {
    const googleMapsApiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  };

  const initAutocomplete = () => {
    const autocompleteInput = document.getElementById("autocomplete-input");

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput
    );

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.geometry) {
        // Add the selected place to the list of selected places
        setSelectedPlaces((prevSelectedPlaces) => [
          ...prevSelectedPlaces,
          selectedPlace,
        ]);

        // Clear the autocomplete input
        setAutocompleteValue("");
        autocompleteInput.value = "";
      }
    });
  };

  const handleDeletePlace = (index) => {
    setSelectedPlaces((prevSelectedPlaces) => {
      const updatedSelectedPlaces = [...prevSelectedPlaces];
      updatedSelectedPlaces.splice(index, 1);
      return updatedSelectedPlaces;
    });
  };

  return (

    <div className="list-page">
      <h1 className="List-title">Customize your Voyage</h1>
      <div className="search-box">
        <input
          id="autocomplete-input"
          type="text"
          value={autocompleteValue}
          onChange={(e) => setAutocompleteValue(e.target.value)}
          className="input"
          placeholder="Search for places"
        />
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
      <div className="selected-places-list">


        <h2 className="Itinerary-list">Ititnerary List</h2>
        <table className="table-list">
          <thead>
            <tr>
              <th className="place-name">Place Name</th>
              <th className="place-action">Action</th>
            </tr>
          </thead>
          <tbody className="list-tbody">
            {selectedPlaces.map((place, index) => (
              <tr key={index}>
                <td className="list td">{place.name}</td>
                <td className="list-delete">
                  <button className="list-button" onClick={() => handleDeletePlace(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Explore;





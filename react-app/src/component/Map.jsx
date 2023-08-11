

import React, { useEffect, useState } from "react";



function Home() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  };

  const initMap = () => {
    const mapOptions = {
      center: { lat: 25.7616798, lng: -80.1917902 },
      zoom: 10,
    };

    const map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    const searchBox = new window.google.maps.places.SearchBox(
      document.getElementById("search-box")
    );

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
      document.getElementById("search-box")
    );

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    const markers = []; // To store the markers

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));
      markers.length = 0;

      // For each place, add a marker
      places.forEach((place) => {
        if (!place.geometry) {
          console.error("Returned place contains no geometry");
          return;
        }

        const marker = new window.google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        });

        markers.push(marker);

        // Add a click event listener to the marker
        marker.addListener("click", () => {
          setSelectedPlace(place); // Store the selected place
        });
      });

      // Adjust map bounds to fit markers
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
    });

    const autocompleteInput = document.getElementById("autocomplete-input");

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput
    );

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.geometry) {
        map.setCenter(selectedPlace.geometry.location);
        map.setZoom(15);
      }
    });
  };

  return (
    <div>
      <div
        id="search-box"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: "1",
        
        }}
      >
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
      <div id="map" style={{ width: "100%", height: "565px" }}></div>
      {selectedPlace && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "10px",
            zIndex: "1",
            
          }}
        >
          <button
            onClick={() => {
              // Implement your "Add to List" logic here
              console.log("Add to List:", selectedPlace);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;


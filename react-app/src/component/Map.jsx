




import React, { useRef, useEffect } from 'react';

const Map = ({ places }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    try {
      if (!places || places.length === 0) {
        // No places to display, return early
        return;
      }

      // Initialize the map
      const mapOptions = {
        center: { lat: 0, lng: 0 }, // Set initial center to a default value
        zoom: 4, // Set the initial zoom level
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add markers for each place
      places.forEach((place) => {
        if (place.lat && place.lng) {
          const marker = new window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map,
            title: place.name,
          });

          // You can customize the marker appearance or add info windows here if needed
        } else {
          console.error('Invalid lat or lng:', place.lat, place.lng);
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [places]);

  return (
 
    <div ref={mapRef} className="map-container" style={{ height: '400px' }}>
      {places.length === 0 && <p>No places to display.</p>}
    </div>
  );
};

export default Map;

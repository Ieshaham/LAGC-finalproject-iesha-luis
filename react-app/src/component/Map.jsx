// import React, { useEffect, useState } from 'react';

// const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

// export default function PhotoGallery() {
//   const [photoUrl, setPhotoUrl] = useState(null); // Initialize with null
//   const photoReference = "AUacShi-EdVlA6WEnDtPcqNXMIsADOb-ArH86roncdUVNTLTHSwltk9ohOweP4eNIuYjfEcAT5hx605p0n-z48EWhbcKCTCFV27lu45nVfBXpPF23QvkR1GtNaXTMP9pFdBGU8RyE5gtNHSVPQTbuiXxL8h09YJNeyWtP4MgJb-sDpWTHH8";
//   const apiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
//   const maxWidth = 4128;

//   useEffect(() => {
//     const fetchPhoto = async () => { // Correct the async function definition
//       try {
//         const res = await fetch(`${backendHostUrl}/getPhotos`);
//         const data = await res.json();
//         console.log(data);
//         console.log("the res: ", data);

//         const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;

//         const response = await fetch(photoUrl);
//         if (response.ok) {
//           const blob = await response.blob();
//           const photoUrl = URL.createObjectURL(blob);
//           setPhotoUrl(photoUrl);
//         } else {
//           console.error('Error fetching photo:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching photos:', error);
//       }
//     };

//     fetchPhoto();
//   }, [apiKey]); // Empty dependency array to run the effect only once

//   return (
//     <div>
//       <h1 className='photo'>Photo Gallery</h1>
//       <div className="photo-list">
//         {photoUrl && <img src={photoUrl} alt="Place" />}
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  };

  const initMap = () => {
    const mapOptions = {
      center: { lat: 25.7616798, lng: -80.1917902 },
      zoom: 10,
    };

    const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

    new window.google.maps.Marker({
      position: { lat: 25.7616798, lng: -80.1917902 },
      map: map,
    });
  };

  return <div id="map" style={{ width: "100%", height: "565px" }}>
    
  </div>;
}

export default Home;






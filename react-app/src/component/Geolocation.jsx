import React, { useState,useEffect } from "react";
import axios from "axios";
// import { CityToLatLngConverter } from './Geolocation';


export default function CityToLatLngConverter  () {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  let latiduds=0;
  let longituds=0;

  const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getLatLng = () => {
    const apiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
    //const apiKey = `AIzaSyBkZdDeKGgnKXzAu-RWrDGQAQBG-x3D334`;
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
    console.log(city);
    console.log(apiKey);
    console.log(geocodeApiUrl);

    axios
      .get(geocodeApiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
          latiduds=lat;
          longituds=lng;
          console.log(latiduds);
          console.log(longituds);
          
          const geocodeApiUrl2 =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?inpu=${city}&types=establishment&location=${latiduds},${longituds}&radius=5000&key=${apiKey}`;
          console.log(apiKey);
          console.log(geocodeApiUrl2);
    axios
          .get(geocodeApiUrl2)
         .then((response) => {
            if (response.data.results.length > 0) {

              {/*const [hours, setHours] = useState([]);
  
              useEffect(() => {
              }, []);*/}
              
              
              (async () => {
                const results = await fetch(
                  `${backendHostUrl}/getActivities`
                );
          
                const data = await results.json();
          
                console.log(data);
              })();
           } else {
             console.log("Answer not found.");
             }
             })
             .catch((error) => {
               console.error("Error fetching data: ", error);
               });
        } else {
          setLatitude("");
          setLongitude("");
          console.log("City not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });


  };

  return (
    <div className="form-group">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={getLatLng}>Get Latitude and Longitude</button>
      {latitude && longitude && (
        <div>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </div>
      )}
    </div>
  );
};

//export default CityToLatLngConverter;

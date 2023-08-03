import React, { useState } from "react";
import axios from "axios";
// import { CityToLatLngConverter } from './Geolocation';


const CityToLatLngConverter = () => {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getLatLng = () => {
    // const apiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
    const apiKey = `AIzaSyBkZdDeKGgnKXzAu-RWrDGQAQBG-x3D334`;
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
    console.log(city);
    console.log(apiKey);
    

    console.log(apiKey);
    console.log(geocodeApiUrl);

    axios
      .get(geocodeApiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
        } else {
          setLatitude("");
          setLongitude("");
          console.log("City not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });


      const geocodeApiUrl2 =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${setLatitude},${setLongitude}&radius=Autocomplete`;
      console.log(apiKey);
      console.log(geocodeApiUrl2);
axios
      .get(geocodeApiUrl2)
     .then((response) => {
        if (response.data.results.length > 0) {
       } else {
         console.log("Answer not found.");
         }
         })
         .catch((error) => {
           console.error("Error fetching data: ", error);
           });
           
           {/*var axios = require('axios');
               var config = {
                 method: 'GET',
                 url: geocodeApiUrl2,
                 headers: { }
               };
               console.log('gettin Answer');
               
               axios(config)
               .then(function (response) {
                 console.log(JSON.stringify(response.data));
               })
               .catch(function (error) {
                 console.log(error);
               });*/}
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

export default CityToLatLngConverter;
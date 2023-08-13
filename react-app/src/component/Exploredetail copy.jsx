import React, { useState } from "react";
import "../App.css";

const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;
const ExploreDetail = () => {
  /*const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");*/
  const queryParameters = new URLSearchParams(window.location.search);
  const place_id = queryParameters.get("place_id");
  console.log("The response from previous URL",place_id);
  /*const handleCityChange = (event) => {
    setCity(event.target.value);
  };*/

 /* const getLatLng = async () => {
    const res = await fetch(`${backendHostUrl}/getCoordinates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    });

    const data = await res.json();
    console.log(data);
    console.log(data.city);

    const { lat, lng } = data.data.results[0].geometry.location;

    const activityRes = await fetch(`${backendHostUrl}/getActivities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lng }),
    });

    const placesData = await activityRes.json();
    console.log(placesData);

  };*/
console.log("Entering call funtion getplacedetail");
const getPlaceDetail = async () => {
  const res2 = await fetch(`${backendHostUrl}/getPlaceDetail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ place_id }),
  });

  const data2 = await res2.json();
  console.log("This is the response:", data2);


console.log("Out from call function getPlaceDetail");

};
getPlaceDetail(); 

  return (
    <div className="form-group">
      {/*<input
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
      )}*/}
      <div>
        <label>The place_id is:</label>
        {place_id}
      </div>
    </div>
  );
};
export default ExploreDetail;

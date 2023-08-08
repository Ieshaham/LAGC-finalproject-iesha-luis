
import "../App.css";
import React, { useState} from 'react';


const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

const ExploreDetail = () => {
  const [city,setCity]= useState("")
  const[photos,setPhotos]=useState("")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  let latiduds = 0;
  let longituds = 0;
  

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setPhotos(event.target.value);
  };


  const getLatLng = async () => {

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

   const { photos } = data.data.results[0].geometry.photos[0];
  setPhotos(photos); 
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
          <div className="placename">value:{photos}
            </div>
          </div>
          
        )}
      </div>
    );
  }
  export default ExploreDetail;
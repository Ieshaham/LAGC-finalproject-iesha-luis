import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../App.css";

const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

const ExploreDetail = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const place_id = queryParameters.get("place_id");
  console.log("The response from previous URL", place_id);

  let navigate = useNavigate();
  const goBack = () => {
    let path = `/geolocation`;
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`
        );

        if (response.status === 200) {
          const data2 = response.data; 
          console.log(data2);
          
        } else {
          console.error("Error fetching place detail:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching place detail:", error);
      }
    };

    fetchData();
  }, [place_id]);

  return (
    <div className="form-group">
      <div>
        <label>The place_id is:</label>
        {place_id}
      </div>
      <div>
        <button className="btn btn-primary" onClick={goBack}>
          &larr;Go back
        </button>
      </div>
    </div>
  );
};

export default ExploreDetail;

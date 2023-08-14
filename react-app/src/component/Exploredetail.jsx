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
  
  useEffect(() => {
    getPlaceDetail();
  }, [])

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

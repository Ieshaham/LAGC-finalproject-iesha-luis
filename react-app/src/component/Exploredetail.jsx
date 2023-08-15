import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

const ExploreDetail = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const place_id = queryParameters.get("place_id");
  const [Phone, setPhone] = useState("");
  const [Name, setName] = useState("");
  const [Photo, setPhoto] = useState("");
  const [Url, setUrl] = useState("");
  const [Address, setAddress] = useState("");
  const [Website, setWebsite] = useState("");
  
  const [PlaceDetail, setPlaceDetail] = useState([]);
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
    setPhone(data2.data.result.formatted_phone_number);
    setName(data2.data.result.name);
    setPhoto(data2.data.result.photos[0].photo_reference);
    setUrl(data2.data.result.url);
    setAddress(data2.data.result.vicinity);
    setWebsite(data2.data.result.website);
    //console.log(Phone);
  
  console.log("Out from call function getPlaceDetail");
  
  };
  
  useEffect(() => {
    getPlaceDetail();
  }, [])

  return (
    <div className="form-group">
      <div>
        <h1>{Name}</h1>
        <div>The photo reference:
          {Photo}
        </div>
        <div>Google Maps Location: {Url}</div>
        <label>The place_id is:</label>
        {place_id}
        </div>
      <div>Address:
        {Address}
      </div>
        <div>
        Phone #:{Phone}
      </div>
      <div>
        For more information visit: {Website}
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

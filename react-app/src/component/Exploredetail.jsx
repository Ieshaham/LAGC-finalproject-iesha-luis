import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <h1>The place information</h1>
        </tr>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Website</th>
          <th>Google Maps Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {Name}
            The photo reference:
            {Photo}
            {place_id}
          </td>
          <td>{Phone}</td>
          <td>
            {Address}
          </td>
          <td>
          <Link to={`${Website}`}>Website</Link>
          </td>changes
          <td>
            <Link to={`${Url}`}>Google Maps Location</Link>
          </td>
        </tr>
        <tr>
          <div>
            <button className="btn btn-primary" onClick={goBack}>
              &larr;Go back
            </button>
          </div>
        </tr>
      </tbody>
    </table>
  );
};

export default ExploreDetail;

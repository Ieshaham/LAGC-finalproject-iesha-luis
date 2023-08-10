import React, { useState, useEffect } from "react";
import ExploreDetail from "./Exploredetail";
//import 'bootstrap/dist/css/bootstrap.css';
//import * as ReactDOM from 'react-dom';
import { useParams, Link } from "react-router-dom";

export default function CityToLatLngConverter() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [placesData, setPlacesData] = useState([]);
  const [ids, setId] = useState("");
  const [name, setName] = useState("");
  const names = {};

  const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

  const itemsPerPage = 10; //Itemps per page on pagination
  //Handeling pagination code
  const handleCityChange = (event) => {
    setCity(event.target.value);
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
    console.log("The CityData is:", data);
    console.log(data.city);
    //console.log(city);
    const { lat, lng } = data.data.results[0].geometry.location;

    const activityRes = await fetch(`${backendHostUrl}/getActivities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lng }),
    });

    const placesData = await activityRes.json();
    setPlacesData(placesData.data.results);

    console.log("The placesData is:", placesData);

    //setName(placesData.data.results[].name);
    /*setLatitude(placesData.data.results[1].geometry.location.lat);
    setLongitude(placesData.data.results[1].geometry.location.lng);*/
    /*console.log({id});
console.log({name});*/
  };

  function parseUrl(url) {
    // const parsedUrl =
    console.log("In the parse<Url function");
    console.log(url.split("\\"));
    console.log("\\");

    return url;
    return <img src={url} />;
  }

  return (
    <div className="form-group">
      <div>
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

      <div>
        <h3>Places</h3>
        <p>The places you could visit are:</p>
      </div>
      <div></div>
      <div className="results">
        <div>
          <table className="table">
            <tr className="title">
              <td>Place & Ranking</td>
              <td>Address</td>
            </tr>
          </table>
          {placesData.map((item) => (
            <table className="table" key={item.place_id}>
              <tr>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.photos[0].html_attributions[0],
                    }}
                  ></div>
                  <div>
                    <img src={item.icon} width="20px" height="20px"></img>
                    {item.name}
                  </div>
                  <div>Rating: {item.rating}</div>
                </td>
                <td>
                  <div>{item.vicinity}</div>
                </td>
                <td>
                  {/*<Link to={`/ExploreDetail?place_id=${place_id}`}>*/}
                  <Link to={`/ExploreDetail?lat=${item.geometry.location.lat}&lng=${item.geometry.location.lng}`}>
                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="button"
                    >
                      More Info
                    </button>
                  </Link>
                </td>
              </tr>
            </table>
          ))}
        </div>
      </div>
    </div>
    /*{item.photos[0]}              */
  );
}

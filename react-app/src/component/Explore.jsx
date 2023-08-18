import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

export default function Explore() {
  const navigate = useNavigate();

  const goBack = () => {
    let path = `/`;
    navigate(path);
  };

  const routeChangetoList = () => {
    let path = `/list`;
    navigate(path);
  };

  const routeChangetoGeolocation = () => {
    let path = `/geolocation`;
    navigate(path);
  };

  return (
    <div className="form-group row">
      <div>
        <button className="Go-back-buttons-on-explore" onClick={goBack}>
          &larr;Go back
        </button>
      </div>
      <div>
        <h1>Search your places</h1>
      </div>
      <div>
        <p>
          Here you could choose search by a specific City Name or you could get
          more information about a specific place. Please choose the best
          option for your search.
        </p>
      </div>
      <div className="row">
        <div>
          <button className="search-city" width="120px" onClick={routeChangetoGeolocation}>
            Search by City
          </button>
        </div>
        <div>
          <button className="search-place" width="120px" onClick={routeChangetoList}>
            Search by Place
          </button>
        </div>
      </div>
    </div>
  );
}

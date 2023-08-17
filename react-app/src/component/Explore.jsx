import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";


const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;
//const backendHostUrl = `https://www.eventbriteapi.com/v3/users/me/?token=UZ2OAYX2ZOAUB7U34BTD`;
// const backendHostUrl ="https://lugras-fluffy-space-computing-machine-vw5pw6v769qhw64g-3000.preview.app.github.dev";

export default function Explore() {
  let navigate = useNavigate(); 
  const routeChangetoList = () =>{ 
    let path = `/list`; 
    navigate(path);
  }
  const routeChangetoGeolocation = () =>{ 
    let path = `/geolocation`; 
    navigate(path);
  }
  return (
    <div className="form-group row">
      <div>
        <h1>Search your places</h1>
      </div>
      <div>
        <p>
          Here you could choose search by an specific City Name or you could get
          more information about an specific place. Please choose the best
          option for your search.
        </p>
      </div>
      <div className="explorebuttons">
        <div>
          <button className="btn  btn-success" width="120px" onClick={routeChangetoGeolocation}>
            Search by City
          </button>
        </div>
        <div>
          <button className="btn btn-warning" width="120px" onClick={routeChangetoList}>
            Search by Place
          </button>
        </div>
      </div>
    </div>
  );
}

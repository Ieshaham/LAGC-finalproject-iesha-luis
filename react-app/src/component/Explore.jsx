// Explore.js

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Context } from '../Context';

export default function Explore() {
  const navigate = useNavigate();
  const { user } = useContext(Context);

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

  const routeChangetoPlacesearch = () => {
    let path = `/placesearch`;
    navigate(path);
  };
  return (
    <div>
      <NavBar />
      <div className="w6-col m4 l3">
      <div className="explorepagediv">
        <div>
    
          <button className="Go-back-buttons-on-explore" onClick={goBack}>
            &larr; Go back
          </button>
         
        </div>
          <div className="scrollable-content">
        <div className="form-group row">
        
          <div className="search-box">
            <h1>Build Your Own Itinerary</h1>
            <p>
            Design a personalized itinerary by selecting attractions and landmarks
            that match your interests, creating a unique travel experience.
              
            </p>
            <button className="search-build" onClick={routeChangetoList}>
              Create
            </button>
          </div>
          
          <div className="search-box2">
            <h1>Explore Hotels</h1>
            <p>
            Discover hotels by inputting a location,
            offering tailored options for your ideal trip.
            </p>
            <button className="search-city" onClick={routeChangetoGeolocation}>
              Find Hotels
            </button>
          </div>
          <div className="search-box3">
            <h1>Explore Places</h1>
            <p>
            Discover restaurants and activities by inputting a location,
            offering tailored options for your ideal trip.
            </p>
            <button className="search-places" onClick={routeChangetoPlacesearch}>
              Find Places
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

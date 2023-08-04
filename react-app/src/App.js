import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./component/Landingpage"
import Explore from "./component/Explore"
import SignIn from "./component/Signin"

import CityToCoordinatesConverter from "./component/Geolocation"
import ExploreDetail from "./component/Exploredetail"
import CityToLatLngConverter from './component/Geolocation';
// import SignUp from "./component/Signup"
import ExploreDetail from "./component/Exploredetail"

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/geolocation" element={<CityToLatLngConverter />}></Route>
          <Route path="/exploredetail" element={<ExploreDetail />}></Route>
          {/*<Route path="/signup" element={<SignUp />}></Route> */}
        </Routes>
  
    </BrowserRouter>
  );
}

